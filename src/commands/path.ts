import { Command } from "commander";
import { stylePath, styleExists } from "../lib/store.js";

export const pathCommand = new Command("path")
  .description("Output the filesystem path to a design system's DESIGN.md")
  .argument("<name>", "Style name")
  .action((name: string) => {
    if (!styleExists(name)) {
      console.error(`Style '${name}' not found.`);
      process.exit(1);
    }
    console.log(stylePath(name));
  });
