import { createInterface } from "node:readline/promises";
import { Command } from "commander";
import { styleExists, deleteStyle } from "../lib/store.js";

export const removeCommand = new Command("remove")
  .description("Delete a saved design style")
  .argument("<name>", "Style name")
  .option("-y, --yes", "Skip confirmation prompt")
  .action(async (name: string, opts: { yes?: boolean }) => {
    if (!styleExists(name)) {
      console.error(`Style '${name}' not found.`);
      process.exit(1);
    }

    if (!opts.yes) {
      const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      const answer = await rl.question(
        `Delete style '${name}'? This cannot be undone. [y/N] `
      );
      rl.close();
      if (answer.toLowerCase() !== "y") {
        console.log("Cancelled.");
        return;
      }
    }

    deleteStyle(name);
    console.log(`Deleted style: ${name}`);
  });
