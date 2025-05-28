import { Command } from './commands/command.js';
import { parseCommandLine } from './command-parser.js';

type CommandRegistry = Record<string, Command>;

export class CLIApp {
  private registeredCommands: CommandRegistry = {};

  constructor(
    private readonly defaultCommand: string = '--help'
  ) {}

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (Object.hasOwn(this.registeredCommands, command.getName())) {
        throw new Error(`Command ${command.getName()} is already registered`);
      }
      this.registeredCommands[command.getName()] = command;
    });
  }

  public getCommand(commandName: string): Command {
    return this.registeredCommands[commandName] ?? this.getDefaultCommand();
  }

  public getDefaultCommand(): Command {
    if (!this.registeredCommands[this.defaultCommand]) {
      throw new Error(`The default command '${this.defaultCommand}' is not registered.`);
    }
    return this.registeredCommands[this.defaultCommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommands = parseCommandLine(argv);
    const commandNames = Object.keys(parsedCommands);

    if (commandNames.length === 0) {
      this.getDefaultCommand().execute();
      return;
    }

    for (const commandName of commandNames) {
      const command = this.getCommand(commandName);
      const commandArguments = parsedCommands[commandName] ?? [];
      command.execute(...commandArguments);
    }
  }
}
