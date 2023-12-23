/**
 * Fastify index controller
 */

import { NotFound } from 'http-errors';

// types
import { Controller } from '@framework/plugins/auto-controllers';

export default async (): Promise<Controller> => [
  /** Homepage */
  ['', async () => NotFound()],
  /** Server status */
  ['status', async () => ({ status: 'OK' })],
  /** Hack: Send 204 for all OPTIONS request */
  ['OPTIONS *', (req, reply) => reply.send(204)],
];
