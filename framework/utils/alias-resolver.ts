import path from 'node:path';
import { access, readFile } from 'node:fs/promises';
import merge from 'deepmerge';

// types
import { ServerInstance } from '@typings/server';

let babelAliasesMap: Record<string, string>;

export const rootDir = (...joins: string[]): string => {
  return path.normalize(path.join(`${__dirname}/../../`, ...joins));
};

const getBabelAliasesMap = async (): Promise<Record<string, string>> => {
  if (babelAliasesMap) {
    return babelAliasesMap;
  }

  const maps = (await readJsonFile(rootDir('.babelrc')));
  babelAliasesMap = maps?.plugins?.find(plugin => plugin[0] === 'module-resolver')?.[1]?.alias;

  return babelAliasesMap;
};

export async function readJsonFile(path: string): Promise<any> {
  try {
    const json = await readFile(path, { encoding: 'utf8' });
    return JSON.parse(json);
  } catch (e) {
    throw e;
  }
}

export const resolveAliasDir = async (path: string) => {
  await getBabelAliasesMap();
  const [alias, ...rest] = path.split(/[\/\\]/);

  if (!babelAliasesMap.hasOwnProperty(alias)) {
    throw new Error('Invalid alias: ' + alias);
  }

  return rootDir(babelAliasesMap[alias], ...rest);
};

const resolveAliasPath = (path: string) => {
  const [alias, ...rest] = path.split(/[\/\\]/);

  if (!babelAliasesMap.hasOwnProperty(alias)) {
    throw new Error('Invalid alias: ' + alias);
  }

  return require.resolve(rootDir(babelAliasesMap[alias], ...rest));
};

export const resolve = async (alias: string): Promise<string> => {
  await getBabelAliasesMap();
  return resolveAliasPath(alias);
};

export const importFile = async (alias: string): Promise<any> => {
  await getBabelAliasesMap();
  return import(await resolve(alias));
};

export async function hasAlias(path: string): Promise<boolean> {
  await getBabelAliasesMap();
  const [alias = '', ...rest] = path.split(/[\/\\]/);
  return babelAliasesMap.hasOwnProperty(alias);
}

export async function exists(alias: string): Promise<boolean> {
  try {
    const filePath = await resolve(alias);
    await access(filePath);
    return true;
  } catch (e) {
    return false;
  }
}

export async function importConfigFile<T>(alias: string, defaultConfig: T, server?: ServerInstance): Promise<T> {
  if (!(await exists(alias))) {
    return defaultConfig;
  }

  const {default: configFetch} = await importFile(alias);
  return merge(defaultConfig, await configFetch(server));
}

export async function importPluginConfig<T>(id: string, server?: ServerInstance, defaultConfig?: T): Promise<T> {
  return importConfigFile<T>(
    `@app/server/config/${id}.plugin.ts`, defaultConfig, server,
  );
}
