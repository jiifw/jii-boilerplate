// @ts-ignore
import op from 'object-path';
import { dirname } from 'node:path';
import { sync } from 'glob';
// @ts-ignore
import merge from 'deepmerge';

// utils
import processModule from './libs/processModule';
// @ts-ignore
import { isObject } from '@framework/utils/object';
// @ts-ignore
import { normalize, normalizePathList } from '@framework/utils/path';

// types
// @ts-ignore
import { ServerInstance } from '@typings/server';
// @ts-ignore
import { AutoModulesOption, module, ModuleMapping } from '@framework/fastify/plugins/auto-modules/types';

interface ProcessModulesConfigArgs {
  config: AutoModulesOption;
  server: ServerInstance;
  onModuleProcess?(config: ModuleMapping): Promise<void>;
}

export const validateRouteArgs = (route: module.Route): void => {
  if (!Array.isArray(route)) {
    throw new Error(`Route must be an array`);
  }

  const [url, handler, options = undefined] = route;

  if ('string' !== typeof url || !String(url).trim()) {
    throw new Error(`Route url must be a string`);
  }

  if (!handler || 'function' !== typeof handler) {
    throw new Error(`Route handler must be a function`);
  }

  if (options && !isObject(options)) {
    throw new Error(`Route options must be an object`);
  }
};

export const processModulesConfig = async (
  { config, server, onModuleProcess }: ProcessModulesConfigArgs
) => {
  const normalizedList = await normalizePathList(
    config.modulesPath, '/**/module.ts',
  );

  const modules = await Promise.all(normalizedList
    .map(path => sync(path))
    .flat()
    .map(file => ({
      config: require(normalize(file))?.default || {},
      dir: dirname(file),
    })),
  );

  const promises = modules.map(async ({ config, dir: dirPath }) => {
    //<editor-fold desc="onInit handler">
    const initCallback = op.get(config, 'onInitialize');

    if (typeof initCallback === 'function') {
      await initCallback(server);
    }
    //</editor-fold>

    const moduleConfig = merge({
      controllersPath: ['@module/controllers'],
      dirPath: dirPath,
    }, config);

    const output = await processModule(moduleConfig);

    if ('function' === typeof onModuleProcess) {
      await onModuleProcess(output);
    }
    return output;
  });

  return (await Promise.all(promises)).filter(result => result);
};
