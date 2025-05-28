import chalk from 'chalk';
import { Command } from './command.js';
import fs from 'node:fs';
import path from 'node:path';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(filePath?: string): void {
    if (!filePath) {
      console.log(chalk.red('Путь к TSV-файлу не указан.'));
      return;
    }

    const fullPath = path.resolve(filePath);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Файл не найден: ${fullPath}`);
    }

    const data = fs.readFileSync(fullPath, 'utf-8');
    console.log(chalk.greenBright('Данные импортированы:'));
    console.log(chalk.cyan(data));
  }
}
