import { Command } from "commander";
import { styleExists, readStyle } from "../lib/store.js";

export const showCommand = new Command("show")
  .description("Display a saved design style")
  .argument("<name>", "Style name")
  .action((name) => {
    if (!styleExists(name)) {
      console.error(`Style '${name}' not found.`);
      process.exit(1);
    }
    console.log(readStyle(name));
  });
