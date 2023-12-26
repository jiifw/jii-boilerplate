// types
import { ServerInstance } from '@framework/typings/server';
import { sequelize } from '@framework/db/sequelize/types';

// configuration
import configuration from '@framework/db/sequelize/configuration';

// utils
import { getValue } from '@framework/env';

export default async (server: ServerInstance): Promise<sequelize.PluginOptions> => {
  return ({
    directory: getValue<string>('SEQUELIZE_DIR', ''),
    traits: {
      auth: {
        //passwordResetTokenExpire: (3600 * 24) * 2, // days
        //passwordResetTokenLength: 60,
        //authKeyLength: 60,
      },
    },
    environment: {
      development: configuration,
      production: configuration,
      staging: configuration,
    },
  });
}
