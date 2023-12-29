import npath from 'node:path';
import nfs, { mkdirSync } from 'node:fs';

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
  return npath.normalize(npath.join(`${__dirname}/../..`, ...joins));
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
  return npath.normalize(require.resolve(getAlias(path)));
};

/** Normalize path, Fix path slashes issue (OS related) */
export const normalize = (path: string): string => {
  return npath.resolve(path).replace(/\\/g, '/');
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

enum PathType {
  File = 'file',
  Directory = 'directory',
}

/**
 * Check that the given path exists and is directory or a file
 */
export const isPath = (path: string, type: 'dir' | 'file' = 'file'): boolean => {
  const _path = normalize(path);

  if (!nfs.existsSync(_path)) {
    return false;
  }

  const stat = nfs.lstatSync(npath.normalize(_path));
  return type === 'dir' && stat.isDirectory()
    || type === 'file' && stat.isFile();
};

/**
 * Synchronously creates a directory recursively.
 * @param aliasOrPath - Alias or absolute directory path
 * @returns `true` if the directory was created, `false` otherwise
 */
export const createDir = (aliasOrPath: string): boolean => {
  const dirPath = npath.normalize(getAlias(aliasOrPath));
  mkdirSync(dirPath, { recursive: true });
  return isPath(dirPath, 'dir');
};
