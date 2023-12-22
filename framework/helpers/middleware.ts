import fp from 'fastify-plugin';

// utils
import { importFile } from '@framework/utils/alias-resolver';
import { isObject } from '@framework/utils/object';

// types
import { plugin } from '@typings/plugin';
import { ServerInstance } from '@typings/server';
import {
  MiddlewareAfter, MiddlewareCallback, MiddlewareMiddleware,
  MiddlewarePlugin, MiddlewareRegister, MiddlewareType, Registry,
} from './middleware.types';

// public types
export type {
  Registry, MiddlewarePlugin, MiddlewareMiddleware,
  MiddlewareCallback, MiddlewareType, MiddlewareRegister,
};

/**
 * Middleware supported types
 */
const middlewareTypes: MiddlewareType[] = [
  'middleware', 'after', 'callback', 'plugin', 'register',
];

/**
 * Register a middleware plugin
 */
const registerCustomPlugin = async <T>(
  plugin: MiddlewarePlugin<T>, server: ServerInstance
) => {
  const { path, config = {} } = plugin;

  const data: plugin.Definition = await importFile(path);

  if (!isObject(data?.info)) {
    throw new Error(`Plugin 'info' must export a valid object`);
  }

  if (!data?.info?.id?.trim()) {
    throw new Error(`Plugin 'info.id' must be a non-empty string`);
  }

  if (!data?.info?.name?.trim()) {
    throw new Error(`Plugin 'info.name' must be a non-empty string`);
  }

  if (data?.info?.metadata && !isObject(data?.info?.metadata)) {
    throw new Error(`Plugin 'info.metadata' must be a valid object`);
  }

  if ('function' !== typeof data?.handler) {
    throw new Error(`Plugin 'handler' must be a valid async function`);
  }

  await server.register(fp(data.handler), {
    name: data?.info?.name,
    ...(data?.info?.metadata || {}),
  });
};

/**
 * Apply a middleware registry to server instance
 * @param middleware - Middleware registry object
 * @param server - Server instance object
 *
 * @example
 *
 *await applyMiddleware([
 *  { path: 'fastify-favicon', type: 'register' },
 *  { path: '@plugins/cors', type: 'plugin' },
 *  { path: 'x-xss-protection', type: 'middleware' },
 *  {
 *    async handler(error: any) {
 *      if (error) throw error;
 *    },
 *    type: 'after',
 *  },
 *  {
 *    async handler(server: ServerInstance, options?: Record<string, any>) {
 *      // logic here
 *    },
 *    type: 'callback',
 *  },
 *], server);
 */
export async function applyMiddleware<T>(
  middleware: Registry<T>, server: ServerInstance
): Promise<void> {
  if (!middleware.length) {
    return;
  }

  for await (const { type, ...data } of middleware) {
    if (!middlewareTypes.includes(type)) {
      throw new Error(`Unknown middleware type '${type}' given`);
    }

    if (type === 'register') {
      const params = <MiddlewareRegister<T>>data;
      await server.register(require(params.path), params.config || {});
    } else if (type === 'middleware') {
      const params = <MiddlewareMiddleware<T>>data;
      server.use(require(params.path)(params.config || {}));
    } else if (type === 'after') {
      await server.after((<MiddlewareAfter>data).handler);
    } else if (type === 'callback') {
      const params = <MiddlewareCallback<T>>data;
      await params.handler(server, params?.config || {});
    } else if (type === 'plugin') {
      await registerCustomPlugin<T>(<MiddlewarePlugin<T>>data, server);
    }
  }
}
