import { Options } from 'sequelize';

// utils
import { getNumberValue, getValue } from '@framework/env';

const configuration: Options = {
  host: getValue<string>('DATABASE_HOST', 'localhost'),
  username: getValue<string>('DATABASE_USERNAME', 'postgres'),
  password: getValue<string>('DATABASE_PASSWORD', 'postgres'),
  database: getValue<string>('DATABASE_NAME', 'postgres'),
  port: getNumberValue('DATABASE_PORT', 5432),
  // Add more options
};

export default configuration;
