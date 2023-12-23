import { readJsonFile } from '@framework/utils/file';
import path from 'node:path';
import { root } from '@framework/utils/path';

// types

/** Aliases map */
const aliasesMap = new Map<string, string>();

/** Name of pre-build aliases */
const rootAliases: string[] = [];

export const aliases = (): any/*Record<string, string>*/ => {
  return Object.fromEntries(aliasesMap.entries());
};

/**
 * Translates a path alias into an actual path.
 *
 * The translation is done according to the following procedure:
 *
 * 1. If the given alias does not start with '@', it is returned back without change;
 * 2. Otherwise, look for the longest registered alias that matches the beginning part
 *    of the given alias. If it exists, replace the matching part of the given alias with
 *    the corresponding registered path.
 * 3. Throw an exception or return false, depending on the `throwException` parameter.
 *
 * For example, by default '@framework' is registered as the alias to the framework directory,
 * say '/path/to/yii'. The alias '@framework/utils/file' would then be translated into '/path/to/framework/utils/file'.
 *
 * Note, this method does not check if the returned path exists or not.
 * @param alias the alias to be translated.
 * @param throwException
 */
export const getAlias = (alias: string, throwException: boolean = true): string => {
  if (!alias.includes('@')) {
    // not an alias
    return alias;
  }

  const slash: string = alias.includes('/') ? '/' : '\\';
  const [aliasName, ...rest] = alias.split(/[\/\\]/);

  if (!aliasesMap.has(aliasName)) {
    if (throwException) {
      throw new Error(`Invalid path alias: ${aliasName}`);
    }

    return alias;
  }

  return [aliasesMap.get(aliasName), ...rest].join(slash);
};

/**
 * Registers a path alias.
 *
 * A path alias is a short name representing a long path (a file path, a URL, etc.)
 * @param alias - the alias name (e.g. "@framework"). It must start with a '@' character.
 * @param path - the path corresponding to the alias. If this is null, the alias will
 * be removed. Trailing '/' and '\' characters will be trimmed. This can be
 *
 * - a directory or a file path (e.g. `/tmp`, `/tmp/main.txt`)
 * - a URL (e.g. `https://www.google.com`)
 */
export const setAlias = (alias: string, path: string): void => {
  if (!alias.startsWith('@')) {
    alias = `@${alias}`;
  }

  if (rootAliases.includes(alias)) {
    throw new Error('Cannot update a root alias');
  }

  aliasesMap.set(alias, getAlias(path));
};

/**
 * Check that given string contains a valid alias or not
 * @param path - Path including alias
 */
export function hasAlias(path: string): boolean {
  const [alias = ''] = path.split(/[\/\\]/);
  return aliasesMap.has(alias);
}

/**
 * Initialize aliases list by parsing .babelrc in root directory
 * @private
 */
const initializeAliasMap = () => {
  if (aliasesMap.size) {
    return;
  }

  const aliases: Record<string, string> =
    readJsonFile(root('.babelrc'))?.plugins
      ?.find(plugin => plugin[0] === 'module-resolver')
      ?.[1]
      ?.alias;

  Object.entries(aliases)
    .forEach(([name, path]) => {
      rootAliases.push(name);
      aliasesMap.set(name, root(path.replace(/[\/\\]$/, '')));
    });
};

(() => {
  // load predefined aliases
  initializeAliasMap();
})();
