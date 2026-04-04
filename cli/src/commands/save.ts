import { text } from "node:stream/consumers";
import { Command } from "commander";
import { writeStyle } from "../lib/store.js";

export const saveCommand = new Command("save")
  .description("Save a design DNA style from stdin")
  .argument("<name>", "Style name (kebab-case)")
  .option("--source-url <url>", "Source URL of the design")
  .action(async (name: string, opts: { sourceUrl?: string }) => {
    let content = (await text(process.stdin)).trim();

    if (opts.sourceUrl && !content.includes("source_url:")) {
      const lines = content.split("\n");
      const insertIdx = lines.findIndex((l) => l.startsWith("#"));
      if (insertIdx >= 0) {
        lines.splice(insertIdx + 1, 0, "", `> source_url: ${opts.sourceUrl}`);
        content = lines.join("\n");
      }
    }

    writeStyle(name, content);
    console.error(`Saved style: ${name}`);
  });
