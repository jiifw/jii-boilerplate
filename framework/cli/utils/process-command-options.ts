import { cli } from '@framework/cli/types';
import { Command, Option } from 'commander';
import { validateCommandOption } from '@framework/cli/utils/validators';

export default async function processCommandOptions(options: Array<cli.CommandOption> = undefined, command: Command): Promise<void> {
  if (!Array.isArray(options) || !options.length) {
    return;
  }

  for (const option of options) {
    await validateCommandOption(option);

    const flags: Array<string> = [option.flag];

    if (option.argument) {
      flags.push(option.argument);
    }

    const instance = new Option(flags.join(' '), option.description);
    option.default && instance.default(option.default);
    option.choices && instance.choices(option.choices);

    instance.makeOptionMandatory(Boolean(option?.required));

    command.addOption(instance);
  }
};
