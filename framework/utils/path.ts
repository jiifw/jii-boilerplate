import path from 'node:path';

// utils
import { getAlias, hasAlias } from '@framework/base/aliases';

/**
 * Get root directory path
 * @param [joins] - Paths to join (optional)
 *
 * @example Default
 * // expected: '/project/path'
 * console.log(rootDir());
 *
 * @example With a filename
 * // expected: '/project/path/package.json'
 * console.log(rootDir('package.json'));
 */
export const root = (...joins: string[]): string => {
  return path.normalize(path.join(`${__dirname}/../..`, ...joins));
};

/**
 * Resolve the given path to file or directory.
 * Note: Having alias in path will automatically replace by the value
 * @param path - The path
 *
 * @example
 * // expected: '/project/path/framework/utils/file.ts'
 * console.log(resolvePath('@framework/utils/file'));
 */
export const resolve = (path: string): string => {
  return require.resolve(getAlias(path));
};

/** Normalize path, Fix path slashes issue (OS related) */
export const normalize = (thePath: string): string => {
  return path.resolve(thePath).replace(/\\/g, '/');
};

/**
 * Normalize the list of paths (resolve aliases and fix slashes)
 */
export const normalizePathList = async (list: Array<string>, postfix: string = ''): Promise<Array<string>> => {
  const newList: Array<string> = [];

  for await (const path of list) {
    if (await hasAlias(path)) {
      const resolved = await getAlias(path);
      newList.push(`${resolved}${postfix}`);
      continue;
    }

    newList.push(`${path}${postfix}`);
  }

  return newList;
};
