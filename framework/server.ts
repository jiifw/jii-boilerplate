/**
 * Fastify server
 */

import * as dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../.env` });

// utils
import { getValue, getNumberValue, isProdEnvironment } from '@framework/env';
import { createServerInstance } from '@framework/fastify/base/bootstrapper';

export default async function bootstrap() {
  // Create and initialize fastify instance
  const server = await createServerInstance();

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
