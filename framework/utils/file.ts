import { accessSync, readFileSync, writeFileSync, unlinkSync, mkdirSync } from 'node:fs';

// utils
import { resolve, isPath } from '@framework/utils/path';
import { getAlias } from '@framework/base/aliases';

/**
 * Read and parse a json file
 * @param path - File path
 */
export function readJsonFile(path: string): any {
  try {
    const json = readFileSync(path, { encoding: 'utf8' });
    return JSON.parse(json);
  } catch (e) {
    throw e;
  }
}

/**
 * Require/Import a file and return the module
 * @param alias - Alias including filename (ext: .js | .ts)
 */
export const importFile = async (alias: string): Promise<any> => {
  return import(resolve(alias));
};

/**
 * Create a text file on filesystem
 * @param aliasOrPath - Alias or absolute directory path including filename (with extension)
 * @param content - Text to store in file
 * @param [overwrite] - Overwrite file upon exists?
 */
export const writeTextFile = (aliasOrPath: string, content: string, overwrite: boolean = false): boolean => {
  const filePath = getAlias(aliasOrPath);

  if (isPath(filePath, 'file')) {
    if (!overwrite) return false;
    unlinkSync(overwrite ? filePath : filePath);
  }

  writeFileSync(getAlias(aliasOrPath), content, { encoding: 'utf8' });
  return isPath(filePath, 'file');
};

/**
 * Resolve the alias path and verify that path exists
 * @param alias - Alias including filename
 */
export function exists(alias: string): boolean {
  try {
    const filePath = resolve(alias);
    accessSync(filePath);
    return true;
  } catch (e) {
    return false;
  }
}
