import { execSync } from "node:child_process";
import { Command } from "commander";
import { copyBundledStyles } from "../lib/store.js";

function isCommandAvailable(cmd: string): boolean {
  try {
    execSync(`${cmd} --version`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function hasPlaywrightChromium(): boolean {
  try {
    const out = execSync("npx playwright install --dry-run chromium 2>&1", {
      encoding: "utf-8",
      timeout: 10000,
    });
    return out.includes("already installed");
  } catch {
    return false;
  }
}

export const initCommand = new Command("init")
  .description("Install dependencies (dembrandt + Playwright) and seed bundled styles")
  .option("--force", "Overwrite existing bundled styles")
  .action((opts: { force?: boolean }) => {
    console.log("Setting up design-distill...\n");

    // 1. Global CLI install
    if (isCommandAvailable("design-distill")) {
      console.log("✓ design-distill: already available");
    } else {
      console.log("Installing design-distill globally...");
      try {
        execSync("npm install -g design-distill", { stdio: "inherit" });
        console.log("✓ design-distill: installed globally");
      } catch {
        console.error(
          "✗ design-distill: global installation failed.\n  Try: sudo npm install -g design-distill, or use nvm to manage Node.js"
        );
      }
    }

    // 2. dembrandt
    if (isCommandAvailable("npx dembrandt")) {
      console.log("✓ dembrandt: already available");
    } else {
      console.log("Installing dembrandt...");
      try {
        execSync("npm install -g dembrandt", { stdio: "inherit" });
        console.log("✓ dembrandt: installed");
      } catch {
        console.error("✗ dembrandt: installation failed");
      }
    }

    // 3. Playwright chromium
    if (hasPlaywrightChromium()) {
      console.log("✓ Playwright chromium: already installed");
    } else {
      console.log("Installing Playwright chromium...");
      try {
        execSync("npx playwright install chromium", { stdio: "inherit" });
        console.log("✓ Playwright chromium: installed");
      } catch {
        console.error("✗ Playwright chromium: installation failed");
      }
    }

    // 4. Bundled styles
    console.log("");
    const result = copyBundledStyles(opts.force);
    if (result.copied.length) {
      console.log(`✓ Bundled styles copied: ${result.copied.join(", ")}`);
    }
    if (result.skipped.length) {
      for (const name of result.skipped) {
        console.log(
          `  Skipped: ${name} (already exists). Use --force to overwrite.`
        );
      }
    }
    if (!result.copied.length && !result.skipped.length) {
      console.log("  No bundled styles found in package.");
    }

    console.log("\nDone! Run `design-distill list` to see available styles.");
  });
