/**
 * Fix slashes in the given string and transform into route
 */
export const sanitizeRoute = (route: string): string => {
  const sanitized = String(route || '')
    .replace(/[\\]+/g, '/')
    .replace(/^[/\\]/, '')
    .replace(/[/\\]$/, '');

  return sanitized.split('/').map(kebabCase).join('/').toLowerCase();
};

/**
 * Transform string into a <code>kebab-case</code>
 */
export const kebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};
