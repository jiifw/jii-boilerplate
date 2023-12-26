/**
 * Fastify sequelize ORM plugin
 * In case a client reaches the maximum number of allowed requests, an error will be sent to the user with the status code set to 429
 */

import deepmerge from 'deepmerge';

// utils
import { importPluginConfig } from '@framework/base/config';
import { memo } from '@framework/base/di';
import { environment, getValue } from '@framework/env';
import { getInstance, newInstance } from './instance';

// types
import { plugin } from '@framework/typings/plugin';
import { sequelize } from './types';
import { normalize } from '@framework/utils/path';

// public types
export type SequelizeOptions = sequelize.PluginOptions;

/** configuration key */
export const configKey: plugin.ConfigKey = `plugin://db/sequelize/config`;

export const info: plugin.Info = {
  id: 'sequelize',
  name: 'fastify-sequelize',
};

const SEQUELIZE_MODELS_DIR = normalize(getValue<string>('SEQUELIZE_DIR', '') + '/models');

export const handler: plugin.Handler = async (server, options) => {
  const config = await importPluginConfig<SequelizeOptions>(
    info.id, server, <SequelizeOptions>deepmerge({
      traits: {},
      development: {},
      staging: {},
      production: {},
    }, options),
  );

  memo<SequelizeOptions>(configKey, config);

  const _environment = environment();

  if (!(_environment in config.environment)) {
    throw new Error(`Unknown environment '${_environment}' provided`);
  }

  newInstance(config.environment[_environment]);

  server.addHook('onClose', async () => {
    await getInstance().close();
  });
};
