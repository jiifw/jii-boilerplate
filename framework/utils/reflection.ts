/**
 * Checks if the value is a function
 * @param func - The function
 */
export const isFunction = (func: any) => {
  const propertyNames = Object.getOwnPropertyNames(func);
  return (!propertyNames.includes('prototype') || propertyNames.includes('arguments'));
};

/**
 * Checks if the value is a class
 * @param val - The value
 */
export const isClass = (val: any): boolean => {
  return typeof val === 'function' && /^\s*class\s+/.test(val.toString());
};
