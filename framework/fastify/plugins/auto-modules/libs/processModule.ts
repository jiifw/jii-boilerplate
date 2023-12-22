import { sync } from 'glob';
import { basename } from 'path';

// utils
import { rootDir } from '@framework/utils/alias-resolver';
import { sanitizeRoute } from '@framework/utils/string';
import { onlyKeys } from '@framework/utils/object';

// types
import { ControllerConfiguration, ModuleConfig, ModuleMapping } from '../types';

export default async (modConfig: ModuleConfig): Promise<ModuleMapping | null> => {
  /** Modules' list */
  const controllers: Array<string> = modConfig.controllersPath
    .map(route => {
      const wildcardPath = rootDir(route.replace(/@module/g, modConfig.dirPath)) + '/*.controller.ts';
      return sync(wildcardPath);
    }).flat();

  if (!controllers.length) {
    return null;
  }

  const config = <ControllerConfiguration>onlyKeys(modConfig, ['dirPath'], true);

  const result: ModuleMapping = {
    ...modConfig,
    controllers: [],
  };

  for (const controllerFile of controllers) {
    const name = sanitizeRoute(basename(controllerFile, '.controller.ts'));
    const route = `/${config.id}/${name}`
      .replace(/^\/+/g, '/')
      .replace(/\/+$/g, '/');

    result.controllers.push({
      name,
      route,
      path: controllerFile,
    });
  }

  return result;
};
