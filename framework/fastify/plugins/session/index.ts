/**
 * Fastify session plugin
 */

// types
// @ts-ignore
import { FastifySessionOptions } from '@fastify/session';
// @ts-ignore
import { ServerInstance } from '@typings/server';
// @ts-ignore
import { plugin } from '@typings/plugin';

// utils
// @ts-ignore
import { importPluginConfig } from '@framework/utils/alias-resolver';
// @ts-ignore
import { getValue } from '@framework/env';

// public types
export type SessionOptions = FastifySessionOptions;

export const info: plugin.Info = {
  id: 'session',
  name: 'fastify-session',
};

export const handler: plugin.Handler = async (server, options) => {
  const secret = getValue<string>('SESSION_SERVER_SECRET', '');

  if (!secret.trim()) {
    throw new Error('Environment variable "SESSION_SERVER_SECRET" cannot be empty');
  }

  const config = await importPluginConfig<FastifySessionOptions>(info.id, server, {
    secret, ...options,
  });

  await server.register(require('@fastify/session'), config);

  server.addHook('preHandler', (request, reply, next) => {
    request.session.destroy(next);
  });

  server.addHook('onSend', async (request, reply) => {
    reply.header('X-Session-ID', request?.session?.sessionId);
  });
};

