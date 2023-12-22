import obp, { Path } from 'object-path';

// utils
import { rootDir } from '@framework/utils/alias-resolver';

export type Environment = 'development' | 'staging' | 'production' | string;

// register app specific variables
process.env['PROJECT_ROOT_DIR'] = rootDir();
process.env['PROJECT_FRAMEWORK_DIR'] = rootDir('framework');
process.env['PROJECT_APP_DIR'] = rootDir('src');

/**
 * @private
 * Replace variables name with their values from variable values.
 */
const replaceDynamicVars = (value: string): string | null => {
  const matchers = [...value.matchAll(/\$\{([^}]+)}/gm)];

  if ( !matchers.length ) {
    return null;
  }

  for (const [placeholder, name] of matchers) {
    const varValue = process.env.hasOwnProperty(name)
      ? process.env[name]
      : '';

    value = value.replace(placeholder, varValue);
  }

  return value;
}

export function getValue<T>(name: Path, defaultValue: T): T {
  let value = obp.get<T>(process.env, name, defaultValue);

  if (typeof value === 'string') {
    const rendered = <T>replaceDynamicVars(value);
    if ( rendered ) value = rendered;
  }

  return value;
}

export function getBoolValue(name: Path, defaultValue: boolean = false): boolean {
  const value = getValue<string>(name, String(defaultValue)).trim();

  return !(!value || value === 'false' || value === '0');
}

export function getNumberValue(name: Path, defaultValue: number = 0): number {
  const value = Number(getValue<string>(name, String(defaultValue)).trim());
  return !value ? defaultValue : value;
}

export function getArrayValue<T>(name: Path, defaultValue: Array<T>): Array<T> {
  const value = getValue<string>(name, '[]').trim();

  if (!value) {
    return defaultValue;
  }

  try {
    const data = JSON.parse(value);
    return !Array.isArray(data) ? defaultValue : data;
  } catch (e) {
    return defaultValue;
  }
}

export function isEnvironment(environment: Environment = 'development'): boolean {
  return getValue<string>('NODE_ENV', 'development').trim() === environment;
}

export function isProdEnvironment(): boolean {
  return isEnvironment('production');
}
