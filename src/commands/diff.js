import { execSync } from "node:child_process";
import { Command } from "commander";
import { styleExists, readStyle, parseDesignHeader } from "../lib/store.js";

function extractTokensFromContent(content) {
  const tokens = [];
  let currentCategory = "";

  for (const line of content.split("\n")) {
    const headingMatch = line.match(/^##\s+(.+)/);
    if (headingMatch) {
      currentCategory = headingMatch[1].trim();
      continue;
    }

    // Color tokens: - **Name** (`#hex`): description
    const colorMatch = line.match(
      /^-\s+\*\*(.+?)\*\*\s*\(`(#[0-9a-fA-F]{3,8})`\)/
    );
    if (colorMatch) {
      tokens.push({
        category: currentCategory,
        token: colorMatch[1],
        value: colorMatch[2],
      });
      continue;
    }

    // Font tokens: - **Name**: `value`
    const fontMatch = line.match(/^-\s+\*\*(.+?)\*\*:\s*`(.+?)`/);
    if (fontMatch && currentCategory.toLowerCase().includes("typo")) {
      tokens.push({
        category: currentCategory,
        token: fontMatch[1],
        value: fontMatch[2],
      });
      continue;
    }

    // Spacing tokens: - `value` — description
    const spacingMatch = line.match(/^-\s+`(\d+(?:px|rem|em))`/);
    if (spacingMatch && currentCategory.toLowerCase().includes("spac")) {
      tokens.push({
        category: currentCategory,
        token: `spacing-${tokens.filter((t) => t.category === currentCategory).length}`,
        value: spacingMatch[1],
      });
    }
  }

  return tokens;
}

function deltaE(hex1, hex2) {
  const toRgb = (hex) => {
    const h = hex.replace("#", "");
    return [
      parseInt(h.slice(0, 2), 16),
      parseInt(h.slice(2, 4), 16),
      parseInt(h.slice(4, 6), 16),
    ];
  };
  try {
    const [r1, g1, b1] = toRgb(hex1);
    const [r2, g2, b2] = toRgb(hex2);
    return Math.sqrt((r2 - r1) ** 2 + (g2 - g1) ** 2 + (b2 - b1) ** 2);
  } catch {
    return Infinity;
  }
}

function spacingDiff(v1, v2) {
  const n1 = parseFloat(v1);
  const n2 = parseFloat(v2);
  if (isNaN(n1) || isNaN(n2)) return Infinity;
  return Math.abs(n2 - n1);
}

export const diffCommand = new Command("diff")
  .description(
    "Compare saved design system against current live site extraction"
  )
  .argument("<name>", "Style name")
  .action(async (name) => {
    if (!styleExists(name)) {
      console.error(`Style '${name}' not found.`);
      process.exit(1);
    }

    const content = readStyle(name);
    const header = parseDesignHeader(content);

    if (!header.source_url) {
      console.error(
        `Style '${name}' has no source_url. Diff requires a remote source.`
      );
      process.exit(1);
    }

    // Check Playwright
    try {
      execSync("npx playwright --version", { stdio: "ignore", timeout: 5000 });
    } catch {
      console.error(
        "Playwright is required for diff. Run `npx design-distill init` first."
      );
      process.exit(1);
    }

    console.log(`Re-extracting tokens from ${header.source_url}...`);

    let liveJson;
    try {
      const output = execSync(
        `npx dembrandt "${header.source_url}" --json-only`,
        { encoding: "utf-8", timeout: 60000 }
      );
      liveJson = JSON.parse(output);
    } catch (err) {
      console.error(`Failed to extract from ${header.source_url}: ${err.message}`);
      process.exit(1);
    }

    const savedTokens = extractTokensFromContent(content);
    const changes = [];

    // Compare colors from live extraction against saved
    if (liveJson.colors) {
      for (const [key, val] of Object.entries(liveJson.colors)) {
        const saved = savedTokens.find(
          (t) =>
            t.category.toLowerCase().includes("color") &&
            t.token.toLowerCase() === key.toLowerCase()
        );
        if (saved && saved.value !== val) {
          if (deltaE(saved.value, String(val)) >= 5) {
            changes.push({
              category: "Colors",
              token: key,
              old: saved.value,
              new: String(val),
            });
          }
        }
      }
    }

    if (changes.length === 0) {
      console.log("\nNo significant changes detected.");
      return;
    }

    // Output markdown table
    const catW = Math.max(8, ...changes.map((c) => c.category.length));
    const tokW = Math.max(5, ...changes.map((c) => c.token.length));
    const oldW = Math.max(9, ...changes.map((c) => c.old.length));
    const newW = Math.max(9, ...changes.map((c) => c.new.length));

    console.log(
      `\n${"Category".padEnd(catW)} | ${"Token".padEnd(tokW)} | ${"Old Value".padEnd(oldW)} | ${"New Value".padEnd(newW)}`
    );
    console.log(
      `${"─".repeat(catW)}-+-${"─".repeat(tokW)}-+-${"─".repeat(oldW)}-+-${"─".repeat(newW)}`
    );
    for (const c of changes) {
      console.log(
        `${c.category.padEnd(catW)} | ${c.token.padEnd(tokW)} | ${c.old.padEnd(oldW)} | ${c.new.padEnd(newW)}`
      );
    }

    console.log(`\n${changes.length} change(s) detected.`);
  });
