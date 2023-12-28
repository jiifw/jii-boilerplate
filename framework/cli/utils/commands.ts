import { basename, dirname } from 'path';

// utils
import { getAlias } from '@framework/base/aliases';

export const ROOT_COMMANDS_DIR: string[] = [
  'framework',
  'src',
];

const GLOB_PATTERN_FRAMEWORK: string = getAlias(`@framework/cli/commands/*.ts`);

export const GLOB_PATTERNS: Array<string | string[]> = [
  GLOB_PATTERN_FRAMEWORK,
  [getAlias(`@framework/**/commands/*.ts`), '!' + GLOB_PATTERN_FRAMEWORK],
  getAlias(`@app/**/commands/*.ts`),
];

export const checkStringEmpty = (val: any) => {
  if ('string' !== typeof val) {
    return true;
  }
  return String(val || '').trim() === '';
};

export interface CommandNameReturn {
  name: string;
  isApp?: boolean;
  isJii?: boolean;
}

export const suggestCommandName = (name: string, filePath: string): CommandNameReturn => {
  const def: CommandNameReturn = {
    name: '',
    isApp: false,
    isJii: false,
  };

  const dir = basename(dirname(dirname(filePath)));

  dir === 'framework' && (def.isJii = true);
  dir === 'src' && (def.isApp = true);

  def.name = !ROOT_COMMANDS_DIR.includes(dir)
    ? `${dir}:${name}`
    : name;

  return def;
};
