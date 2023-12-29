import select, { Separator } from '@inquirer/select';

// utils
import CliCommand, { cli } from '@framework/cli/classes/CliCommand';
import { Command } from 'commander';
import invoker from './generate/invoker';

export default class extends CliCommand implements cli.Command {
  description = 'Generates files based on a schematic.';

  /*argument = {
    name: '<schematic>',
    description: 'Schematic type',
    //defaultValue?: unknown;
  };*/

  /*options: cli.CommandOption[] = [
    {
      flag: '-type, --type',
      argument: '<name>',
      description: 'file name (e.g., users)',
    },
    {
      flag: '-d, --directory',
      argument: '[path]',
      default: '@app/controllers',
      description: 'absolute controllers directory path (aliases supported)',
    },
  ];*/

  async action(name, options, com) {
    await invoker()
  }
}
