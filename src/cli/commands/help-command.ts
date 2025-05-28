import chalk from 'chalk';
import { Command } from './command.js';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public execute(): void {
    console.log(chalk.greenBright('Доступные команды:'));
    console.log(`${chalk.cyan('--help')}                            ${chalk.magenta('Вывести список поддерживаемых команд')}`);
    console.log(`${chalk.cyan('--version')}                         ${chalk.magenta('Вывести версию приложения')}`);
    console.log(`${chalk.cyan('--import <path>')}                   ${chalk.magenta('Вывести данные из TSV-файла')}`);
  }
}
