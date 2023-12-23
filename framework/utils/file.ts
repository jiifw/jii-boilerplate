import { accessSync, readFileSync } from 'node:fs';

// utils
import { resolve } from '@framework/utils/path';

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
