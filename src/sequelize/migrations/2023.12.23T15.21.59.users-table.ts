// types
import { DataTypes, Sequelize } from 'sequelize';
import { Migration } from '@framework/db/sequelize/umzug';

export const up: Migration = async ({ context: sequelize }: { context: Sequelize }) => {
  await sequelize.getQueryInterface().createTable('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

export const down: Migration = async ({ context: sequelize }: { context: Sequelize }) => {
  await sequelize.getQueryInterface().dropTable('users');
};
