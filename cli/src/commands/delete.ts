import { Command } from "commander";
import { styleExists, deleteStyle } from "../lib/store.js";

export const deleteCommand = new Command("delete")
  .description("Delete a saved design style and its screenshots")
  .argument("<name>", "Style name")
  .action((name: string) => {
    if (!styleExists(name)) {
      console.error(`Style not found: ${name}`);
      process.exit(1);
    }
    deleteStyle(name);
    console.error(`Deleted style: ${name}`);
  });
