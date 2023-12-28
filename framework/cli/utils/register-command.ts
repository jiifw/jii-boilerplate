import { basename } from 'path';
import { Command } from 'commander';

// utils
import { validateCommand } from './validators';
import { checkStringEmpty, suggestCommandName } from './commands';
import processCommandOptions from './process-command-options';

// types
import { cli } from './../types';
import { Class as ClassStatic } from 'utility-types';

export default async function registerCommand(Class: ClassStatic<cli.Command>, program: Command, filePath: string): Promise<Command> {
  const instance: cli.Command = new Class(program);

  const name = checkStringEmpty(instance?.name)
    ? basename(filePath, '.ts')
    : instance.name;

  const cmdName = suggestCommandName(name, filePath);
  const command = new Command(instance?.name ?? cmdName.name);

  await validateCommand(instance);

  if (instance?.init) {
    await instance?.init.apply(null, [command, program]);
  }

  if (instance?.argument) {
    const args: [string, string] | [string, string, unknown] = [
      instance.argument.name,
      instance.argument.description,
    ];

    if (instance.argument.defaultValue) {
      args.push(<string>instance?.argument?.defaultValue);
    }
    command.argument(...args);
  }

  command.aliases(instance.aliases);
  command.description(instance.description);

  command.action(async (...a) => {
    await instance.action.apply(null, <any>a);
  });

  await processCommandOptions(instance.options, command);

  command.configureHelp({
    sortSubcommands: true,
    sortOptions: true,
  });

  return command;
}
