import merge from 'deepmerge';
import { exists, importFile } from '@framework/utils/file';

// types
import { ServerInstance } from '@framework/typings/server';

/**
 * Import a configuration file (.ts | .js)
 * @param alias - Alias including filename (ext: .js | .ts)
 * @param defaultConfig - Default configuration file
 * @param server - Server instance
 */
export async function importConfigFile<T>(alias: string, defaultConfig: T, server?: ServerInstance): Promise<T> {
  if (!exists(alias)) {
    return defaultConfig;
  }

  const { default: configFetch } = await importFile(alias);
  return merge(defaultConfig, await configFetch(server));
}

/**
 * Import an app based plugin configuration file (.ts)
 * @param id - Plugin id
 * @param server - Server instance
 * @param [defaultConfig] - Default configuration file
 */
export async function importPluginConfig<T>(id: string, server?: ServerInstance, defaultConfig?: T): Promise<T> {
  return importConfigFile<T>(
    `@app/server/config/${id}.plugin.ts`, defaultConfig, server,
  );
}
