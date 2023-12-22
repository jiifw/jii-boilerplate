/**
 * Friendly CORS Fastify Plugin
 */

import * as merge from 'deepmerge';

// utils
import { getOrigin } from './utils';
// @ts-ignore
import { importPluginConfig } from '@framework/utils/alias-resolver';


// types
import { CorsOptions } from 'cors';
// @ts-ignore
import { ServerInstance } from '@typings/server';
// @ts-ignore
import { plugin } from '@typings/plugin';

// public types
export { CorsOptions };

export const info: plugin.Info = {
  id: 'cors',
  name: 'fastify-cors',
};

export const handler: plugin.Handler = async (server, options) => {
  const config = await importPluginConfig<CorsOptions>(info.id, server, merge({
    optionsSuccessStatus: 204,
    preflightContinue: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }, options));

  const corsOptions = <CorsOptions>merge(config, {
    origin: (origin, callback) => {
      false !== getOrigin(origin)
        ? callback(null, true)
        : callback(new Error('Not allowed by CORS'));
    },
  });

  server.use(require('cors')(corsOptions));
};
