import { input } from '@inquirer/prompts';

// utils
import CliCommand, { cli } from '@framework/cli/classes/CliCommand';

export default class extends CliCommand {
  description = 'Generate DB migration files';

  options: cli.CommandOption[] = [
    {
      flag: '-n, --name',
      argument: '<name>',
      description: 'file name (e.g., users)',
    },
    {
      flag: '-d, --directory',
      argument: '[path]',
      default: '@app/controllers',
      description: 'absolute controllers directory path (aliases supported)',
    },
  ];

  //init(command) {
    /*command.argument('<name>', 'name of controller file')
      .option('--dir', 'Directory path', '@app/controllers')
      .action((options) => {
        console.log('<name> options:', options);
      });*/
  //}

  async action(name, options, com) {
    const answer = await input({ message: 'Enter your name' });
    console.log('answer:', answer);
  }
}
