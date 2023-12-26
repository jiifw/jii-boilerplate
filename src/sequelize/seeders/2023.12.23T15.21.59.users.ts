// types
import { Sequelize } from 'sequelize';
import { Seeder } from '@framework/db/sequelize/umzug';

const users = [
  { id: 1, name: 'John Doe' },
];

export const up: Seeder = async ({ context: sequelize }: { context: Sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert('users', users);
};

export const down: Seeder = async ({ context: sequelize }: { context: Sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete('users', { id: users.map(r => r.id) });
};
