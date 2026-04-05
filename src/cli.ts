import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { listCommand } from "./commands/list.js";
import { showCommand } from "./commands/show.js";
import { removeCommand } from "./commands/remove.js";
import { pathCommand } from "./commands/path.js";
import { diffCommand } from "./commands/diff.js";
import { previewCommand } from "./commands/preview.js";

const program = new Command();

program
  .name("design-distill")
  .description("Manage your design system library")
  .version("0.3.0");

program.addCommand(initCommand);
program.addCommand(listCommand);
program.addCommand(showCommand);
program.addCommand(removeCommand);
program.addCommand(pathCommand);
program.addCommand(diffCommand);
program.addCommand(previewCommand);

program.parse();
