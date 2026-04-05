#!/usr/bin/env node

import { Command } from "commander";
import { initCommand } from "../src/commands/init.js";
import { listCommand } from "../src/commands/list.js";
import { showCommand } from "../src/commands/show.js";
import { removeCommand } from "../src/commands/remove.js";
import { pathCommand } from "../src/commands/path.js";
import { diffCommand } from "../src/commands/diff.js";
import { previewCommand } from "../src/commands/preview.js";

const program = new Command()
  .name("design-distill")
  .description("Manage your design system library — extract, store, and reuse design styles")
  .version("0.2.0");

program.addCommand(initCommand);
program.addCommand(listCommand);
program.addCommand(showCommand);
program.addCommand(removeCommand);
program.addCommand(pathCommand);
program.addCommand(diffCommand);
program.addCommand(previewCommand);

program.parse();
