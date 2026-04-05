import { execSync } from "node:child_process";
import { Command } from "commander";
import { styleExists, readStyle, parseDesignHeader } from "../lib/store.js";
import { extractTokensFromContent } from "../lib/parsers.js";
import { deltaE } from "../lib/color.js";

interface DiffChange {
  category: string;
  token: string;
  old: string;
  new: string;
}

export const diffCommand = new Command("diff")
  .description(
    "Compare saved design system against current live site extraction"
  )
  .argument("<name>", "Style name")
  .action(async (name: string) => {
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

    try {
      execSync("npx playwright --version", { stdio: "ignore", timeout: 5000 });
    } catch {
      console.error(
        "Playwright is required for diff. Run `design-distill init` first."
      );
      process.exit(1);
    }

    console.log(`Re-extracting tokens from ${header.source_url}...`);

    let liveJson: Record<string, Record<string, string>>;
    try {
      const output = execSync(
        `npx dembrandt "${header.source_url}" --json-only`,
        { encoding: "utf-8", timeout: 60000 }
      );
      liveJson = JSON.parse(output) as Record<string, Record<string, string>>;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`Failed to extract from ${header.source_url}: ${message}`);
      process.exit(1);
      return; // unreachable but satisfies TS
    }

    const savedTokens = extractTokensFromContent(content);
    const changes: DiffChange[] = [];

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
