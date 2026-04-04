import { Command } from "commander";
import { stylePath, ensureScreenshotsDir } from "../lib/store.js";

export const pathCommand = new Command("path")
  .description("Output the file path for a style or its screenshots directory")
  .argument("<name>", "Style name")
  .argument("[subdir]", 'Subdirectory (e.g., "screenshots")')
  .action((name: string, subdir?: string) => {
    if (subdir === "screenshots") {
      console.log(ensureScreenshotsDir(name));
    } else {
      console.log(stylePath(name));
    }
  });
