import moment from 'moment';
// @ts-ignore
import { nanoid } from 'nanoid';

// utils
import { generateHash as generateHashNative, sha1 } from '@framework/utils/crypto';


/**
 * Return current Unix timestamp
 * @param [utc=true] - Time in UTC or not
 * @returns Returns the current time measured in the number of seconds since the Unix Epoch (January 1 1970 00:00:00 GMT).
 */
export const time = (utc: boolean = false): number => {
  return utc
    ? moment().utc().unix()
    : moment().unix();
};

/**
 * Generates a secure hash from a value and a random salt.
 * @param value - Value to verify
 * @param options={} - Additional options
 * @returns Generated hash string
 */
const generateHash = (value, options: Partial<{ cost: number }> = {}) => {
  return generateHashNative(value, options?.cost || 11);
};

/**
 * Generates a value's secure hash & password
 * @param value - Value to hash
 */
export const generatePassword = (value: string): {
  password: string;
  hash: string;
} => ({
  password: sha1(value),
  hash: generateHash(value),
});

/**
 * Generates authorization key
 */
export function generateAuthKey(length = 40): string {
  return nanoid(length);
}
