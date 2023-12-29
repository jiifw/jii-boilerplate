import select from '@inquirer/select';
// see: https://github.com/SBoudrias/Inquirer.js/tree/master/packages/select

import config from './config';

export default async function invoker(): Promise<void> {
  const schematic = await select({
    message: 'Choose a schematic form',
    choices: config.choices,
  });

  const { default: invokerFunc } = require(`${__dirname}/collection/${schematic}`);
  await invokerFunc();
}
