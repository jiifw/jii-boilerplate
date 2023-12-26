/**
 * Fastify server
 */

// utils
import { loadEnv, getNumberValue, getValue, isProdEnvironment } from '@framework/env';
import { memo } from '@framework/base/di';
import { createServerInstance } from '@framework/server/bootstrapper';
import { ServerInstance } from '@framework/typings/server';

// di instance
global['di'] = new Map<string, any>();

// load env
loadEnv();

export default async function bootstrap() {
  // Create and initialize fastify instance
  const server = memo<ServerInstance>('appServerInstance', await createServerInstance());

  const config = {
    host: getValue<string>('SERVER_HOST', 'localhost'),
    port: getNumberValue('SERVER_PORT', 8030),
  };

  try {
    server.listen(config);
    console.log(`Server is listening on: http://${config.host}:${config.port}`);
  } catch (err) {
    !isProdEnvironment() && console.log(err);
    server.log.error(err);
    process.exit(1);
  }
}
