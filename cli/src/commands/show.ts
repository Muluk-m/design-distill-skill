import { Command } from "commander";
import { styleExists, readStyle } from "../lib/store.js";

export const showCommand = new Command("show")
  .description("Display a saved design style")
  .argument("<name>", "Style name")
  .action((name: string) => {
    if (!styleExists(name)) {
      console.error(`Style not found: ${name}`);
      process.exit(1);
    }
    console.log(readStyle(name));
  });
