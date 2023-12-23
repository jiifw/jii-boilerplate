/**
 * Fastify controllers auto-loader plugin
 */

import { sync } from 'glob';
import merge from 'deepmerge';

// utils
import { processRoutes } from './utils';
import { normalizePathList, root } from '@framework/utils/path';
import { importPluginConfig } from '@framework/base/config';

// types
import { AutoControllerOptions } from './types';
import { plugin } from '@framework/typings/plugin';
import { module } from '@framework/plugins/auto-modules';

// public types
export type Controller = module.Controller;
export type { AutoControllerOptions } from './types';

export const info: plugin.Info = {
  id: 'auto-controllers',
  name: 'fastify-auto-controllers',
};

export const handler: plugin.Handler = async (server, options) => {
  const config = await importPluginConfig<AutoControllerOptions>(
    info.id, server, merge({
      controllersPath: [`@app/controllers`],
    }, options),
  );

  /** Controllers files */
  const controllers = (await normalizePathList(
    config.controllersPath, '/**/*.controller.ts',
  )).map(path => sync(path)).flat();

  for await (const controllerPath of controllers) {
    const processor = await import(root(controllerPath));
    const routes = await processor.default(server);

    if (!Array.isArray(routes)) {
      throw new Error(`Controller routes must be an array`);
    }

    if (!routes.length) {
      continue;
    }

    await processRoutes(routes, server);
  }
};
