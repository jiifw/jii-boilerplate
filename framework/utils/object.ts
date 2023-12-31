/**
 * Check that the given object is an actual object or not
 */
export const isObject = (obj: any): boolean => {
  const type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};

/**
 * Get the object with only provided keys
 * @param obj - Plain object
 * @param keys - List of fields to have only
 * @param [excludeMode=false] - Reverse: Skip those fields which are provided in `keys`
 *
 * @example Include mode
 * const result = onlyKeys({a: 1, b: 2, c: 3}, ['a', 'b']);
 * console.log('Result:', result); // {a: 1, b: 2}
 *
 * @example Exclude mode (`excludeMode` param as true)
 * const result = onlyKeys({a: 1, b: 2, c: 3}, ['a', 'b'], true);
 * console.log('Result:', result); // {c: 3}
 */
export const onlyKeys = (obj: Record<string, any>, keys: Array<string> = [], excludeMode: boolean = false): Record<string, any> => {
  const objKeys = Object.keys(obj);

  if (!objKeys.length || !keys.length) return {};

  const normalized = objKeys
    .filter(key => excludeMode ? !keys.includes(key) : keys.includes(key))
    .map((key) => [key, obj[key]]);

  return Object.fromEntries(normalized);
};
