/**
 * Friendly CORS Fastify Plugin
 */

import merge from 'deepmerge';

// utils
import { getOrigin } from './utils';
import { importPluginConfig } from '@framework/base/config';


// types
import { CorsOptions } from 'cors';
import { plugin } from '@framework/typings/plugin';

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
