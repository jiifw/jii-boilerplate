import * as dotenv from 'dotenv';

/**
 * Load .env into environment variables
 * @param [path] - *(optional)* Absolute path to .env file
 */
export const loadEnv = (path: string = undefined): void => {
  dotenv.config({ path: path || `${__dirname}/../../.env` });
};
