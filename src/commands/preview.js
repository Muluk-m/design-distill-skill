import { tmpdir, platform } from "node:os";
import { join } from "node:path";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { Command } from "commander";
import { styleExists, readStyle, parseDesignHeader } from "../lib/store.js";

function extractOverview(content) {
  const section = content.match(/## Overview\n([\s\S]*?)(?=\n---|\n## )/);
  if (!section) return {};
  const text = section[1];
  const toneMatch = text.match(/\*\*Tone\*\*:\s*(\w+)\s*.*?`(#[0-9a-fA-F]{3,8})`/);
  const personalityMatch = text.match(/\*\*Personality\*\*:\s*(.+)/);
  const antiMatch = text.match(/\*\*Anti-patterns\*\*:\s*(.+)/);
  const descLines = text.split("\n").filter((l) => l && !l.startsWith("**"));
  return {
    description: descLines.join(" ").trim(),
    tone: toneMatch?.[1] || "neutral",
    bgColor: toneMatch?.[2] || "#ffffff",
    personality: personalityMatch?.[1]?.trim() || "",
    antiPatterns: antiMatch?.[1]?.trim() || "",
  };
}

function extractColors(content) {
  const colors = [];
  const section = content.match(/## Colors\n([\s\S]*?)(?=\n## |\n---)/);
  if (!section) return colors;
  for (const line of section[1].split("\n")) {
    const m = line.match(/^-\s+\*\*(.+?)\*\*\s*\(`(#[0-9a-fA-F]{3,8})`\):\s*(.*)/);
    if (m) colors.push({ name: m[1], hex: m[2], desc: m[3].trim() });
  }
  return colors;
}

function extractTypography(content) {
  const typo = [];
  const section = content.match(/## Typography\n([\s\S]*?)(?=\n## |\n---)/);
  if (!section) return typo;
  for (const line of section[1].split("\n")) {
    const m = line.match(/^-\s+\*\*(.+?)\*\*:\s*`(.+?)`/);
    if (m) typo.push({ name: m[1], value: m[2] });
  }
  return typo;
}

function extractSpacing(content) {
  const spacing = [];
  const section = content.match(/## Spacing\n([\s\S]*?)(?=\n## |\n---)/);
  if (!section) return spacing;
  for (const line of section[1].split("\n")) {
    const bullet = line.match(/^-\s+`(\d+(?:px|rem|em))`/);
    if (bullet) { spacing.push(bullet[1]); continue; }
    const table = line.match(/\|\s*\d+(?:px|rem|em)\s*\|/);
    if (table) {
      for (const m of line.matchAll(/(\d+)px/g)) {
        const v = m[1] + "px";
        if (!spacing.includes(v)) spacing.push(v);
      }
      continue;
    }
    const base = line.match(/\*\*.*?\*\*:?\s*(\d+(?:px|rem|em))/);
    if (base && !spacing.includes(base[1])) spacing.push(base[1]);
    const prop = line.match(/^-\s+.+?:\s*`?(\d+(?:px|rem|em))/);
    if (prop && !spacing.includes(prop[1])) spacing.push(prop[1]);
  }
  return spacing.sort((a, b) => parseInt(a) - parseInt(b)).filter((v) => parseInt(v) <= 128);
}

function extractComponents(content) {
  const components = [];
  const section = content.match(/## Components\n([\s\S]*?)(?=\n## |\n---)/);
  if (!section) return components;
  const parts = section[1].split(/\n### /);
  for (const part of parts.slice(1)) {
    const nameEnd = part.indexOf("\n");
    const name = part.slice(0, nameEnd).trim();
    const cssMatch = part.match(/```css\n([\s\S]*?)```/);
    const css = cssMatch ? cssMatch[1].trim() : "";
    const props = {};
    for (const line of css.split("\n")) {
      const m = line.match(/^\s*([\w-]+):\s*(.+?);/);
      if (m) props[m[1]] = m[2].trim();
    }
    if (name) components.push({ name, css, props });
  }
  return components;
}

function isDark(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}

function contrastColor(hex) {
  return isDark(hex) ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)";
}

function subtleBorder(dark) {
  return dark
    ? "1px solid rgba(255,255,255,0.08)"
    : "1px solid rgba(0,0,0,0.08)";
}

function surfaceColor(bgHex, dark) {
  if (dark) {
    const h = bgHex.replace("#", "");
    const r = Math.min(255, parseInt(h.slice(0, 2), 16) + 12);
    const g = Math.min(255, parseInt(h.slice(2, 4), 16) + 12);
    const b = Math.min(255, parseInt(h.slice(4, 6), 16) + 12);
    return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }
  return "#ffffff";
}

function generateHtml(name, header, overview, colors, typography, spacing, components) {
  const nativeDark = isDark(overview.bgColor);
  const accentColor = colors.find(
    (c) =>
      /accent|brand|primary/i.test(c.name) && !/text|bg|background|surface/i.test(c.name)
  )?.hex || (nativeDark ? "#6366f1" : "#2563eb");

  const fontEntry = typography.find((t) => /font family|primary|body|headline/i.test(t.name));
  const fontFamily = fontEntry
    ? `${fontEntry.value}, system-ui, sans-serif`
    : "system-ui, -apple-system, sans-serif";

  const groupColors = (list) => {
    const groups = {};
    for (const c of list) {
      let group = "Other";
      const n = c.name.toLowerCase();
      if (/background|bg|surface|canvas/.test(n)) group = "Backgrounds";
      else if (/text|foreground|on-/.test(n)) group = "Text";
      else if (/border|line|outline|divider|separator/.test(n)) group = "Borders";
      else if (/brand|accent|primary|secondary|tertiary|cta/.test(n)) group = "Brand";
      else if (/success|error|warning|info|green|red|yellow|blue|orange|purple/.test(n)) group = "Semantic";
      if (!groups[group]) groups[group] = [];
      groups[group].push(c);
    }
    return groups;
  };

  const colorGroups = groupColors(colors);

  const renderColorGroup = (groupName, items) => `
    <div class="color-group">
      <h3>${groupName}</h3>
      <div class="color-grid">
        ${items.map((c) => `
          <div class="color-card">
            <div class="color-swatch" style="background:${c.hex}"></div>
            <div class="color-info">
              <span class="color-name">${c.name}</span>
              <code class="color-hex">${c.hex}</code>
            </div>
          </div>`).join("")}
      </div>
    </div>`;

  const renderButtons = () => {
    const primary = components.find((c) => /primary.*(button|btn)/i.test(c.name));
    const secondary = components.find((c) => /secondary.*(button|btn)/i.test(c.name));
    if (!primary && !secondary) return "";
    const btnBase = `display: inline-flex; align-items: center; justify-content: center; cursor: pointer; font-family: inherit; font-weight: 500; transition: opacity 0.15s;`;
    const pStyle = primary
      ? Object.entries(primary.props).map(([k, v]) => `${k}:${v}`).join(";")
      : `background:${accentColor}; color:${contrastColor(accentColor)}; padding:8px 16px; border-radius:6px; border:none`;
    const sStyle = secondary
      ? Object.entries(secondary.props).map(([k, v]) => `${k}:${v}`).join(";")
      : `background:transparent; color:var(--fg); padding:8px 16px; border-radius:6px; border:var(--border)`;
    return `
      <div class="button-row">
        <button style="${btnBase};${pStyle}">Primary Action</button>
        <button style="${btnBase};${sStyle}">Secondary</button>
      </div>`;
  };

  const renderCard = () => {
    const card = components.find((c) => /card/i.test(c.name));
    if (!card) return "";
    const style = Object.entries(card.props).map(([k, v]) => `${k}:${v}`).join(";");
    return `
      <div class="sample-card" style="${style}; overflow:hidden">
        <div style="padding: 20px">
          <div style="font-size:0.75rem; color:var(--fg-muted); margin-bottom:8px; text-transform:uppercase; letter-spacing:0.05em">Sample Card</div>
          <div style="font-size:1.1rem; font-weight:600; margin-bottom:8px">Component Preview</div>
          <div style="font-size:0.875rem; color:var(--fg-muted); line-height:1.5">This card uses the extracted border-radius, background, border, and padding values from the design system.</div>
        </div>
      </div>`;
  };

  const darkBg = overview.bgColor && nativeDark ? overview.bgColor : "#0a0a0a";
  const lightBg = overview.bgColor && !nativeDark ? overview.bgColor : "#fafafa";

  return `<!DOCTYPE html>
<html lang="en" data-theme="${nativeDark ? "dark" : "light"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${name} — Design System Preview</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    :root {
      --accent: ${accentColor};
    }
    [data-theme="dark"] {
      --bg: ${darkBg};
      --fg: rgba(255,255,255,0.9);
      --fg-muted: rgba(255,255,255,0.5);
      --fg-dim: rgba(255,255,255,0.35);
      --surface: ${surfaceColor(darkBg, true)};
      --border: 1px solid rgba(255,255,255,0.08);
      --hover: rgba(255,255,255,0.03);
      --tag-bg: rgba(255,255,255,0.06);
      --bar-opacity: 0.5;
      --bar-hover-opacity: 0.8;
      --toggle-bg: rgba(255,255,255,0.08);
      --toggle-fg: rgba(255,255,255,0.7);
      --toggle-hover: rgba(255,255,255,0.12);
    }
    [data-theme="light"] {
      --bg: ${lightBg};
      --fg: rgba(0,0,0,0.85);
      --fg-muted: rgba(0,0,0,0.45);
      --fg-dim: rgba(0,0,0,0.3);
      --surface: #ffffff;
      --border: 1px solid rgba(0,0,0,0.08);
      --hover: rgba(0,0,0,0.02);
      --tag-bg: rgba(0,0,0,0.04);
      --bar-opacity: 0.25;
      --bar-hover-opacity: 0.45;
      --toggle-bg: rgba(0,0,0,0.06);
      --toggle-fg: rgba(0,0,0,0.6);
      --toggle-hover: rgba(0,0,0,0.1);
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: ${fontFamily};
      background: var(--bg);
      color: var(--fg);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      transition: background 0.3s, color 0.3s;
    }

    .page { max-width: 960px; margin: 0 auto; padding: 48px 24px 96px; }

    /* Theme toggle */
    .theme-toggle {
      position: fixed;
      top: 20px;
      right: 20px;
      display: flex;
      align-items: center;
      gap: 0;
      background: var(--toggle-bg);
      border: var(--border);
      border-radius: 999px;
      padding: 3px;
      z-index: 100;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    .theme-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 999px;
      background: transparent;
      color: var(--toggle-fg);
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s, color 0.2s;
    }
    .theme-btn:hover { background: var(--toggle-hover); }
    .theme-btn.active {
      background: var(--accent);
      color: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }
    .native-badge {
      position: fixed;
      top: 58px;
      right: 20px;
      font-size: 0.65rem;
      color: var(--fg-dim);
      text-align: center;
      z-index: 100;
      letter-spacing: 0.03em;
    }

    .header {
      margin-bottom: 48px;
      padding-bottom: 32px;
      border-bottom: var(--border);
    }
    .header-eyebrow {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--accent);
      margin-bottom: 12px;
      font-weight: 600;
    }
    .header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.1;
      margin-bottom: 12px;
    }
    .header-meta {
      font-size: 0.875rem;
      color: var(--fg-muted);
    }
    .header-meta a { color: var(--accent); text-decoration: none; }
    .header-personality {
      display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap;
    }
    .tag {
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 999px;
      background: var(--tag-bg);
      color: var(--fg-muted);
      border: var(--border);
    }

    .section { margin-bottom: 48px; }
    .section-title {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--fg-dim);
      margin-bottom: 20px;
      font-weight: 600;
    }

    /* Colors */
    .color-group { margin-bottom: 24px; }
    .color-group h3 {
      font-size: 0.8rem;
      color: var(--fg-muted);
      margin-bottom: 12px;
      font-weight: 500;
    }
    .color-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 12px;
    }
    .color-card {
      border-radius: 8px;
      overflow: hidden;
      border: var(--border);
      background: var(--surface);
      transition: background 0.3s, border 0.3s;
    }
    .color-swatch { height: 64px; width: 100%; }
    .color-info { padding: 8px 10px; display: flex; flex-direction: column; gap: 2px; }
    .color-name {
      font-size: 0.75rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .color-hex {
      font-size: 0.7rem;
      font-family: 'SF Mono', 'Fira Code', monospace;
      color: var(--fg-muted);
      background: none;
    }

    /* Typography */
    .type-scale { display: flex; flex-direction: column; gap: 2px; }
    .type-row {
      display: flex;
      align-items: baseline;
      padding: 12px 16px;
      border-radius: 6px;
      transition: background 0.15s;
    }
    .type-row:hover { background: var(--hover); }
    .type-label {
      width: 140px;
      flex-shrink: 0;
      font-size: 0.75rem;
      color: var(--fg-muted);
      font-weight: 500;
    }
    .type-value {
      font-size: 0.8rem;
      font-family: 'SF Mono', 'Fira Code', monospace;
      color: var(--fg-dim);
      margin-left: auto;
      padding-left: 16px;
    }

    /* Spacing */
    .spacing-scale { display: flex; flex-direction: column; gap: 6px; }
    .spacing-row { display: flex; align-items: center; gap: 12px; padding: 4px 0; }
    .spacing-label {
      width: 48px;
      flex-shrink: 0;
      font-size: 0.75rem;
      font-family: 'SF Mono', 'Fira Code', monospace;
      color: var(--fg-muted);
      text-align: right;
    }
    .spacing-bar-track {
      flex: 1;
      height: 24px;
      border-radius: 4px;
      background: var(--hover);
      overflow: hidden;
    }
    .spacing-bar {
      height: 100%;
      border-radius: 4px;
      background: var(--accent);
      opacity: var(--bar-opacity);
      transition: opacity 0.15s;
    }
    .spacing-row:hover .spacing-bar { opacity: var(--bar-hover-opacity); }

    /* Components */
    .component-showcase {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    @media (max-width: 640px) { .component-showcase { grid-template-columns: 1fr; } }
    .component-panel {
      border: var(--border);
      border-radius: 10px;
      padding: 24px;
      background: var(--surface);
      transition: background 0.3s, border 0.3s;
    }
    .component-panel-title {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--fg-dim);
      margin-bottom: 16px;
      font-weight: 600;
    }
    .button-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
    .sample-card { border-radius: 8px; }

    .footer {
      margin-top: 64px;
      padding-top: 24px;
      border-top: var(--border);
      font-size: 0.75rem;
      color: var(--fg-dim);
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="theme-toggle">
    <button class="theme-btn" data-theme-set="light" title="Light mode" onclick="setTheme('light')">☀️</button>
    <button class="theme-btn" data-theme-set="dark" title="Dark mode" onclick="setTheme('dark')">🌙</button>
  </div>
  <div class="native-badge">native: ${nativeDark ? "dark" : "light"}</div>
  <script>
    function setTheme(t) {
      document.documentElement.setAttribute('data-theme', t);
      document.querySelectorAll('.theme-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.themeSet === t);
      });
    }
    setTheme('${nativeDark ? "dark" : "light"}');
  </script>
  <div class="page">
    <header class="header">
      <div class="header-eyebrow">Design System Preview</div>
      <h1>${name}</h1>
      <p class="header-meta">
        ${header.source_url ? `<a href="${header.source_url}" target="_blank">${header.source_url}</a>` : "Local project"}
        ${header.distilled ? ` · Distilled ${header.distilled}` : ""}
        · ${overview.tone} theme
      </p>
      ${overview.personality ? `
      <div class="header-personality">
        ${overview.personality.split(",").map((p) => `<span class="tag">${p.trim()}</span>`).join("")}
      </div>` : ""}
    </header>

    <div class="section">
      <div class="section-title">Color Palette</div>
      ${Object.entries(colorGroups).map(([group, items]) => renderColorGroup(group, items)).join("")}
    </div>

    <div class="section">
      <div class="section-title">Typography</div>
      <div class="type-scale">
        ${typography.map((t) => `
          <div class="type-row">
            <span class="type-label">${t.name}</span>
            <span style="font: ${/\d/.test(t.value) ? t.value : `1rem ${t.value}`}">${t.value}</span>
            <span class="type-value">${t.value}</span>
          </div>`).join("")}
      </div>
    </div>

    <div class="section">
      <div class="section-title">Spacing Scale</div>
      <div class="spacing-scale">
        ${spacing.map((s) => {
          const px = parseInt(s);
          const maxPx = Math.max(...spacing.map((v) => parseInt(v)));
          const pct = Math.max(2, (px / maxPx) * 100);
          return `
          <div class="spacing-row">
            <span class="spacing-label">${s}</span>
            <div class="spacing-bar-track">
              <div class="spacing-bar" style="width:${pct}%"></div>
            </div>
          </div>`;
        }).join("")}
      </div>
    </div>

    ${components.length ? `
    <div class="section">
      <div class="section-title">Components</div>
      <div class="component-showcase">
        <div class="component-panel">
          <div class="component-panel-title">Buttons</div>
          ${renderButtons()}
        </div>
        <div class="component-panel">
          <div class="component-panel-title">Card</div>
          ${renderCard()}
        </div>
      </div>
    </div>` : ""}

    <footer class="footer">
      Generated by design-distill · <a href="https://github.com/Muluk-m/design-dna-skill" style="color:${accentColor}; text-decoration:none">GitHub</a>
    </footer>
  </div>
</body>
</html>`;
}

function openInBrowser(filePath) {
  const os = platform();
  try {
    if (os === "darwin") execSync(`open "${filePath}"`);
    else if (os === "win32") execSync(`start "" "${filePath}"`);
    else execSync(`xdg-open "${filePath}"`);
  } catch {
    console.log(`Open this file in your browser: ${filePath}`);
  }
}

export const previewCommand = new Command("preview")
  .description("Generate a visual HTML preview of a design system")
  .argument("<name>", "Style name")
  .action((name) => {
    if (!styleExists(name)) {
      console.error(`Style '${name}' not found.`);
      process.exit(1);
    }

    const content = readStyle(name);
    const header = parseDesignHeader(content);
    const overview = extractOverview(content);
    const colors = extractColors(content);
    const typography = extractTypography(content);
    const spacing = extractSpacing(content);
    const components = extractComponents(content);

    const html = generateHtml(name, header, overview, colors, typography, spacing, components);
    const filePath = join(tmpdir(), `design-distill-preview-${name}.html`);
    writeFileSync(filePath, html, "utf-8");

    console.log(`Preview written to: ${filePath}`);
    openInBrowser(filePath);
  });
