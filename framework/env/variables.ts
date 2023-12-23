import obp, { Path } from 'object-path';

// utils
import { getAlias } from '@framework/base/aliases';

export type Environment = 'development' | 'staging' | 'production' | string;

/**
 * @private
 * Replace variables name with their values from variable values.
 */
const replaceDynamicVars = (value: string): string | null => {
  const matchers = [...value.matchAll(/\$\{([^}]+)}/gm)];

  if (!matchers.length) {
    return null;
  }

  for (const [placeholder, name] of matchers) {
    const varValue = process.env.hasOwnProperty(name)
      ? process.env[name]
      : '';

    value = value.replace(placeholder, varValue);
  }

  return value;
};

export function getValue<T>(name: Path, defaultValue: T): T {
  let value = obp.get<T>(process.env, name, defaultValue);

  if (typeof value === 'string') {
    const rendered = <T>replaceDynamicVars(value);
    if (rendered) value = rendered;
  }

  return <T>getAlias(value as string, false);
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

/**
 * Get current environment name
 */
export function environment(): string {
  return getValue<string>('NODE_ENV', 'development').trim();
}

/**
 * Match that the active environment is same as the provided one
 */
export function isEnvironment(env: Environment = 'development'): boolean {
  return environment() === env;
}

/**
 * Current environment is production or not
 */
export function isProdEnvironment(): boolean {
  return isEnvironment('production');
}
