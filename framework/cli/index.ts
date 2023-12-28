import figlet from 'figlet';
import { Command } from 'commander';

// utils
import { loadEnv } from '@framework/env';
import listCommands from './utils/list-commands';

loadEnv();

export async function cliInvoker() {
  const program = new Command('jii');

  console.log(figlet.textSync('Jii Framework'));

  program
    .version('1.0.0')
    .description('A Jii framework CLI tools for an easy development');

  const commands = await listCommands(program);

  commands.map(command => program.addCommand(command));
  program.showHelpAfterError('(add --help for additional information)');

  program.configureHelp({
    sortSubcommands: true,
    sortOptions: true,
  });

  if (!process.argv.length || !process.argv.slice(2).length) {
    program.outputHelp();
  } else {
    program.parseAsync(process.argv);
  }
}

