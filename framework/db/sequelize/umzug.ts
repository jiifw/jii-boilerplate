import { SequelizeStorage, Umzug } from 'umzug';
import { readFileSync } from 'node:fs';

// utils
import { getValue } from '@framework/env';
import { newInstance } from './instance';

const sequelize = newInstance();

export type Migration = typeof migrator._types.migration;
export type Seeder = typeof seeder._types.migration;

const sequelizeRoot = getValue<string>('SEQUELIZE_DIR', '');

export const migrator = new Umzug({
  migrations: {
    glob:[`migrations/*.ts`, {cwd: sequelizeRoot}],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'migration_meta',
  }),
  create: {
    folder: `${sequelizeRoot}/migrations`,
    template: filepath => [
      [filepath, readFileSync(`${__dirname}/cli/migrate.template.txt`).toString()],
    ],
  },
  logger: console,
});

export const seeder = new Umzug({
  migrations: {
    glob:[`seeders/*.ts`, {cwd: sequelizeRoot}],
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
    modelName: 'seeder_meta',
  }),
  create: {
    folder: `${sequelizeRoot}/seeders`,
    template: filepath => [
      [filepath, readFileSync(`${__dirname}/cli/seed.template.txt`).toString()],
    ],
  },
  logger: console,
});
