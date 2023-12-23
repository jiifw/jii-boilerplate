/**
 * Fastify server
 */

import * as dotenv from 'dotenv';

// utils
import { getNumberValue, getValue, isProdEnvironment } from '@framework/env';
import { createServerInstance } from '@framework/server/bootstrapper';

dotenv.config({ path: `${__dirname}/../.env` });

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
