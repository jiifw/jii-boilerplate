import { Command as CommandNative, Command as Commander } from 'commander';
import { cli } from '@framework/cli/types';

// public types
export { cli };

export default class CliCommand implements cli.Command {
  name = null;
  description = '';
  options = [];
  aliases = [];

  constructor(protected readonly cli: Commander) {
  }

  async init(command?: CommandNative, program?: CommandNative): Promise<void> {
  }

  async action(name: string, options: Record<string, any>, command: CommandNative): Promise<void> {
    return Promise.resolve(undefined);
  }
}
