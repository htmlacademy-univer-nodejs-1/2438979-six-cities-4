#!/usr/bin/env node

import { CLIApp, HelpCommand, ImportCommand, VersionCommand } from './cli/index.js';

const cliApp = new CLIApp();

cliApp.registerCommands([
  new HelpCommand(),
  new VersionCommand(),
  new ImportCommand()
]);

cliApp.processCommand(process.argv.slice(2));
