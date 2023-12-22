/**
 * Fastify modules definition file autoloader
 */

// @ts-ignore
import merge from 'deepmerge';

// types
import { AutoModulesOption, ModuleMapping } from './types';
// @ts-ignore
import { ServerInstance } from '@typings/server';
// @ts-ignore
import { plugin } from '@typings/plugin';

// utils
// @ts-ignore
import { importPluginConfig } from '@framework/utils/alias-resolver';

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
