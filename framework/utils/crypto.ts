import crypto from 'node:crypto';
import bcryptjs from 'bcryptjs';

const _sha1 = crypto.createHash('sha1');

/**
 * Generates a secure sha1 hash of value
 * @param str - Value to verify
 * @returns Generated hash string
 */
export const sha1 = (str: string): string => {
  _sha1.update(str);
  return _sha1.digest().toString();
};

/**
 * Generates a secure hash from a value and a random salt.
 * @param str - The value
 * @param [cost] - Cost length, more length more computation power
 * @returns Generated hash string
 */
export const generateHash = (str, cost: number = 11): string => {
  return bcryptjs.hashSync(str, bcryptjs.genSaltSync(cost));
};
