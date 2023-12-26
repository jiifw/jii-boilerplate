import { Options, Sequelize } from 'sequelize';
import { memo, retrieve } from '@framework/base/di';
import merge from 'deepmerge';

// utils
import { getBoolValue, getValue, loadEnv } from '@framework/env';

loadEnv(); // .env importer

// config
import configuration from './configuration';

// types
import { sequelize } from './types';

const diInstanceKey = `plugin://db/sequelize/instance`;

/**
 * Get initialised sequelize instance
 */
export function getInstance(): Sequelize {
  return retrieve(diInstanceKey);
}

/**
 * Initialise a new sequelize instance
 * @param [options] - Server options
 * @param [cli=false] - Compact mode for running in CLI app
 */
export function newInstance(options: Partial<Options> = {}, cli: boolean = false): Sequelize {
  const logging = getBoolValue('SEQUELIZE_LOGGING', false) ? false : console.log;

  const config = merge(configuration, {
    dialect: getValue<sequelize.Connection['dialect']>('SEQUELIZE_DIALECT', 'postgres'),
    logging,
    logQueryParameters: getBoolValue('SEQUELIZE_LOG_QUERY_PARAMETERS', false),
    benchmark: getBoolValue('SEQUELIZE_BENCHMARK', false),
  });

  const instance = new Sequelize(merge(config, options));

  if (!cli) {
    memo<Sequelize>(diInstanceKey, instance);
  }

  // Run a query to set default timezone
  instance.query(`SET timezone = "+00:00"`, { logging: false });
  return instance;
}
