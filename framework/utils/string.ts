// utils
import {kebab} from './inflector';

/**
 * Fix slashes in the given string and transform into route
 */
export const sanitizeRoute = (route: string): string => {
  const sanitized = String(route || '')
    .replace(/\\+/g, '/')
    .replace(/^[/\\]/, '')
    .replace(/[/\\]$/, '');

  return sanitized.split('/').map(kebab).join('/').toLowerCase();
};

/**
 * Convert a non-string value into a string
 * @param val - The mixed value
 * @param [trim] - Trimming whitespaces?
 */
export const toString = (val: any, trim: boolean = false): string => {
  let str = String(val || '');

  if (trim) {
    str = str.trim();
  }

  return str;
};
