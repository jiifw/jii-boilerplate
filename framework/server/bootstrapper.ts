import fastify from 'fastify';

// types
import { ServerHTTPOptions, ServerInstance } from '@framework/typings/server';

// utils
import { getBoolValue, isProdEnvironment } from '@framework/env';
import { importConfigFile } from '@framework/base/config';

// middleware processor
import fwBootstrapper from './bootstrap';
import appBootstrapper from '@app/server/bootstrap';

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

  return server;
}
