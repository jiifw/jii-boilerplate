import { resolve } from 'node:path';

// utils
import { hasAlias, resolveAliasDir } from './alias-resolver';

/** Normalize path, Fix path slashes issue (OS related) */
export const normalize = (path: string): string => {
  return resolve(path).replace(/\\/g, '/');
};

/**
 * Normalize the list of paths (resolve aliases and fix slashes)
 */
export const normalizePathList = async (list: Array<string>, postfix: string = ''): Promise<Array<string>> => {
  const newList: Array<string> = [];

  for await (const path of list) {
    if (await hasAlias(path)) {
      const resolved = await resolveAliasDir(path);
      newList.push(`${resolved}${postfix}`);
      continue;
    }

    newList.push(`${path}${postfix}`);
  }

  return newList;
};
