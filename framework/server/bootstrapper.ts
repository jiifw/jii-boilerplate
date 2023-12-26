import fastify from 'fastify';

// types
import { ServerHTTPOptions, ServerInstance } from '@framework/typings/server';

// utils
import { getBoolValue, isProdEnvironment } from '@framework/env';
import { importConfigFile } from '@framework/base/config';

// middleware processor
import fwBootstrapper from './bootstrap';
import appBootstrapper from '@app/server/bootstrap';
import { applyMiddleware } from '@framework/helpers/middleware';

export async function createServerInstance(): Promise<ServerInstance> {
  const config = await importConfigFile<ServerHTTPOptions>(
    '@app/server/config/server.ts', {
      logger: !isProdEnvironment() && getBoolValue('SERVER_LOGGING', false),
    },
  );

  const server = <ServerInstance>fastify(config);

  // register middleware engine
  await server.register(require('@fastify/middie'));

  // initialize bootstrapper(s)
  await fwBootstrapper(server);
  await appBootstrapper(server);

  await applyMiddleware([
    { path: '@framework/plugins/auto-controllers', type: 'plugin' },
    { path: '@framework/plugins/auto-modules', type: 'plugin' },
  ], server);

  return server;
}
