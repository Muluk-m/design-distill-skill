import { tmpdir, platform } from "node:os";
import { join } from "node:path";
import { writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { Command } from "commander";
import { styleExists, readStyle, parseDesignHeader } from "../lib/store.js";

function extractColorsFromContent(content) {
  const colors = [];
  const colorSection = content.match(
    /## Colors\n([\s\S]*?)(?=\n## |\n---|\Z)/
  );
  if (!colorSection) return colors;

  for (const line of colorSection[1].split("\n")) {
    const match = line.match(
      /^-\s+\*\*(.+?)\*\*\s*\(`(#[0-9a-fA-F]{3,8})`\):\s*(.*)/
    );
    if (match) {
      colors.push({ name: match[1], hex: match[2], desc: match[3].trim() });
    }
  }
  return colors;
}

function extractTypographyFromContent(content) {
  const typo = [];
  const section = content.match(
    /## Typography\n([\s\S]*?)(?=\n## |\n---|\Z)/
  );
  if (!section) return typo;

  for (const line of section[1].split("\n")) {
    const match = line.match(/^-\s+\*\*(.+?)\*\*:\s*`(.+?)`/);
    if (match) {
      typo.push({ name: match[1], value: match[2] });
    }
  }
  return typo;
}

function extractSpacingFromContent(content) {
  const spacing = [];
  const section = content.match(/## Spacing\n([\s\S]*?)(?=\n## |\n---)/);
  if (!section) return spacing;

  for (const line of section[1].split("\n")) {
    // Format: - `8px` — description
    const bulletMatch = line.match(/^-\s+`(\d+(?:px|rem|em))`/);
    if (bulletMatch) {
      spacing.push(bulletMatch[1]);
      continue;
    }
    // Format: | `space-X` | 8px | usage |  (table row)
    const tableMatch = line.match(/\|\s*\d+(?:px|rem|em)\s*\|/);
    if (tableMatch) {
      const vals = [...line.matchAll(/(\d+)px/g)].map((m) => m[1] + "px");
      for (const v of vals) {
        if (!spacing.includes(v)) spacing.push(v);
      }
      continue;
    }
    // Format: **Base unit**: 8px
    const baseMatch = line.match(/\*\*.*?\*\*:?\s*(\d+(?:px|rem|em))/);
    if (baseMatch && !spacing.includes(baseMatch[1])) {
      spacing.push(baseMatch[1]);
    }
    // Format: - Button padding: `12px 16px` or - Button padding: 12px 16px
    const propMatch = line.match(
      /^-\s+.+?:\s*`?(\d+(?:px|rem|em))/
    );
    if (propMatch && !spacing.includes(propMatch[1])) {
      spacing.push(propMatch[1]);
    }
  }
  return spacing;
}

function generateHtml(name, header, colors, typography, spacing) {
  const fontFamily =
    typography.find((t) => t.name.toLowerCase().includes("primary"))?.value ||
    "system-ui, sans-serif";

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${name} — Design System Preview</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: ${fontFamily}; background: #f5f5f5; color: #333; padding: 2rem; }
    h1 { font-size: 1.8rem; margin-bottom: 0.5rem; }
    .meta { color: #888; margin-bottom: 2rem; font-size: 0.9rem; }
    section { background: #fff; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.08); }
    h2 { font-size: 1.2rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem; }
    .colors { display: flex; flex-wrap: wrap; gap: 1rem; }
    .swatch { text-align: center; }
    .swatch-box { width: 80px; height: 60px; border-radius: 6px; border: 1px solid rgba(0,0,0,0.1); margin-bottom: 4px; }
    .swatch-label { font-size: 0.75rem; color: #666; }
    .swatch-hex { font-size: 0.7rem; font-family: monospace; color: #999; }
    .typo-row { margin-bottom: 0.75rem; }
    .typo-name { font-size: 0.8rem; color: #888; margin-bottom: 2px; }
    .spacing-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
    .spacing-bar { height: 20px; background: #4a9eff; border-radius: 3px; }
    .spacing-label { font-size: 0.8rem; font-family: monospace; color: #666; min-width: 50px; }
  </style>
</head>
<body>
  <h1>${name}</h1>
  <p class="meta">${header.source_url ? `Source: ${header.source_url}` : "Local project"} ${header.distilled ? `· Distilled: ${header.distilled}` : ""}</p>

  <section>
    <h2>Colors</h2>
    <div class="colors">
      ${colors
        .map(
          (c) => `
        <div class="swatch">
          <div class="swatch-box" style="background:${c.hex}"></div>
          <div class="swatch-label">${c.name}</div>
          <div class="swatch-hex">${c.hex}</div>
        </div>`
        )
        .join("")}
    </div>
  </section>

  <section>
    <h2>Typography</h2>
    ${typography
      .map(
        (t) => `
      <div class="typo-row">
        <div class="typo-name">${t.name}</div>
        <div style="font: ${t.value.includes("px") ? t.value : `16px ${t.value}`}">${t.value}</div>
      </div>`
      )
      .join("")}
  </section>

  <section>
    <h2>Spacing Scale</h2>
    ${spacing
      .map(
        (s) => `
      <div class="spacing-row">
        <div class="spacing-label">${s}</div>
        <div class="spacing-bar" style="width:${parseInt(s) * 2}px"></div>
      </div>`
      )
      .join("")}
  </section>
</body>
</html>`;
}

function openInBrowser(filePath) {
  const os = platform();
  try {
    if (os === "darwin") {
      execSync(`open "${filePath}"`);
    } else if (os === "win32") {
      execSync(`start "" "${filePath}"`);
    } else {
      execSync(`xdg-open "${filePath}"`);
    }
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
    const colors = extractColorsFromContent(content);
    const typography = extractTypographyFromContent(content);
    const spacing = extractSpacingFromContent(content);

    const html = generateHtml(name, header, colors, typography, spacing);
    const filePath = join(tmpdir(), `design-distill-preview-${name}.html`);
    writeFileSync(filePath, html, "utf-8");

    console.log(`Preview written to: ${filePath}`);
    openInBrowser(filePath);
  });
