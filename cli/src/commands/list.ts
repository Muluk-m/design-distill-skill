import { Command } from "commander";
import { listStyles } from "../lib/store.js";

export const listCommand = new Command("list")
  .description("List all saved design styles")
  .option("--json", "Output as JSON array")
  .action((opts: { json?: boolean }) => {
    const styles = listStyles();
    if (opts.json) {
      console.log(JSON.stringify(styles));
    } else {
      for (const s of styles) {
        console.log(s);
      }
    }
  });
