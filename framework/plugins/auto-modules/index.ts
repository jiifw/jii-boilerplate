/**
 * Fastify modules definition file autoloader
 */

import merge from 'deepmerge';

// types
import { AutoModulesOption, ModuleMapping } from './types';
import { plugin } from '@framework/typings/plugin';

// utils
import { importPluginConfig } from '@framework/base/config';

// processors
import { processModulesConfig } from './utils';
import processController from './libs/processController';

// public types
export type { AutoModulesOption, ModuleConfiguration, module } from './types';

export const info: plugin.Info = {
  id: 'auto-modules',
  name: 'fastify-auto-modules',
};

export const handler: plugin.Handler = async (server, options) => {
  const config = await importPluginConfig<AutoModulesOption>(
    info.id, server, merge({
      modulesPath: [`@app/modules`],
    }, options),
  );

  const onModuleProcess = async ({ controllers, ...data }: ModuleMapping) => {
    const promises = controllers.map(controller => (
      processController(controller, server, data)
    ));

    await Promise.all(promises);
  };

  await processModulesConfig({
    config, server, onModuleProcess,
  });
};
