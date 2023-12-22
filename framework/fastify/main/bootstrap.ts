// utils
import { applyMiddleware } from '@framework/helpers/middleware';

// types
import { ServerInstance } from '@typings/server';

/**
 * Server bootstrapper
 */
export default async (server: ServerInstance): Promise<void> => {
  // Register middlewares'
  await applyMiddleware([
    { path: 'fastify-favicon', type: 'register' },
    { path: '@plugins/cors', type: 'plugin' },
    { path: '@plugins/rate-limit', type: 'plugin' },
    { path: 'fastify-graceful-shutdown', type: 'register' },
    { path: 'x-xss-protection', type: 'middleware' },
    { path: '@fastify/accepts', type: 'register' },
    { path: '@fastify/url-data', type: 'register' },
    { path: '@fastify/cookie', type: 'register' },
    { path: '@fastify/formbody', type: 'register' },
    { path: '@fastify/multipart', type: 'register', config: { attachFieldsToBody: 'keyValues' } },
    { path: '@plugins/auto-controllers', type: 'plugin' },
    { path: '@plugins/auto-modules', type: 'plugin' },
    {
      async handler(error: any) {
        if (error) throw error;
      },
      type: 'after',
    },
  ], server);
}
