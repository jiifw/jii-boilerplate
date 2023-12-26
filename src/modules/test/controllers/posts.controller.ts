// types
import { module } from '@framework/plugins/auto-modules';
import { User } from '@app/sequelize/models';
import Jii from '@framework/jii';

export default async (): Promise<module.Controller> => [
  ['index', index],
  ['list', list],
  ['POST create', create],
  ['POST form', form],
];

const index = async (req, reply) => {
  const records = await User.findAll({ raw: true });
  return {
    status: records,
  };
};

const list = async (req, reply) => {
  return {
    status: 'ok',
  };
};

const create = async (req) => {
  return {
    status: 'ok',
  };
};

const form = async (req) => {
  return {
    status: 'ok',
  };
};
