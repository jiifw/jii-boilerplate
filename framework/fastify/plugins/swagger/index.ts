/**
 * Fastify requests rate limiter
 * In case a client reaches the maximum number of allowed requests, an error will be sent to the user with the status code set to 429
 */

import fastifySwagger, { SwaggerOptions } from '@fastify/swagger';

// utils
// @ts-ignore
import { getNumberValue } from '@framework/env';
// @ts-ignore
import { importPluginConfig } from '@framework/utils/alias-resolver';

// types
// @ts-ignore
import { ServerInstance } from '@typings/server';
// @ts-ignore
import { plugin } from '@typings/plugin';

// public types
export { SwaggerOptions };

export const info: plugin.Info = {
  id: 'swagger',
  name: 'fastify-swagger',
};

export const handler: plugin.Handler = async (server, options) => {
  const config = await importPluginConfig<SwaggerOptions>(
    info.id, server, options,
  );

  server.register(fastifySwagger, config);
};
