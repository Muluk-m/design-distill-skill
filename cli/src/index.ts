#!/usr/bin/env node
import { Command } from "commander";
import { saveCommand } from "./commands/save.js";
import { listCommand } from "./commands/list.js";
import { showCommand } from "./commands/show.js";
import { deleteCommand } from "./commands/delete.js";
import { pathCommand } from "./commands/path.js";

const program = new Command()
  .name("ddna")
  .description("Design DNA — manage your local design style library")
  .version("0.1.0");

program.addCommand(saveCommand);
program.addCommand(listCommand);
program.addCommand(showCommand);
program.addCommand(deleteCommand);
program.addCommand(pathCommand);

program.parse();
