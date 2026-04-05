import { Command } from "commander";
import { listStyles, readStyle, parseDesignHeader } from "../lib/store.js";

interface StyleEntry {
  name: string;
  source_url: string;
  distilled: string;
}

export const listCommand = new Command("list")
  .description("List all saved design styles")
  .option("--json", "Output as JSON array")
  .action((opts: { json?: boolean }) => {
    const styles = listStyles();

    if (styles.length === 0) {
      console.log("No styles saved yet.");
      return;
    }

    const entries: StyleEntry[] = styles.map((name) => {
      const content = readStyle(name);
      const header = parseDesignHeader(content);
      return {
        name,
        source_url: header.source_url || "",
        distilled: header.distilled || "",
      };
    });

    if (opts.json) {
      console.log(JSON.stringify(entries, null, 2));
      return;
    }

    const nameW = Math.max(6, ...entries.map((e) => e.name.length));
    const urlW = Math.max(10, ...entries.map((e) => e.source_url.length));

    console.log(
      `${"NAME".padEnd(nameW)}  ${"SOURCE URL".padEnd(urlW)}  DISTILLED`
    );
    console.log(`${"─".repeat(nameW)}  ${"─".repeat(urlW)}  ${"─".repeat(10)}`);

    for (const e of entries) {
      console.log(
        `${e.name.padEnd(nameW)}  ${e.source_url.padEnd(urlW)}  ${e.distilled}`
      );
    }
  });
