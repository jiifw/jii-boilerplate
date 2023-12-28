import { sync } from 'glob';
import { Command } from 'commander';

// utils
import { GLOB_PATTERNS } from './../utils/commands';
import registerCommand from './../utils/register-command';

export default async function listCommands(instance: Command) {
  const promises = GLOB_PATTERNS
    .map(pattern => sync(pattern, { absolute: true }))
    .flat()
    // promising the list
    .map(file => registerCommand(require(file).default, instance, file));

  return Promise.all(promises);
}


