import chalk from 'chalk';
import { Command } from './command.js';
import { createRequire } from 'node:module';

export class VersionCommand implements Command {
  public getName(): string {
    return '--version';
  }

  public execute(): void {
    const require = createRequire(import.meta.url);
    const packageJson = require('../../../package.json');
    console.log(chalk.greenBright(`Версия приложения: ${packageJson.version}`));
  }
}
