#!/usr/bin/env node

import 'reflect-metadata';
import { CLIApp, HelpCommand, ImportCommand, VersionCommand, GenerateCommand } from './cli/index.js';

const cliApp = new CLIApp();

cliApp.registerCommands([
  new HelpCommand(),
  new VersionCommand(),
  new ImportCommand(),
  new GenerateCommand()
]);

cliApp.processCommand(process.argv.slice(2));
