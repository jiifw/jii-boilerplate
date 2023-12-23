// types
import { module } from '@framework/plugins/auto-modules';

export default async (): Promise<module.Controller> => [
  ['index', index],
  ['list', list],
  ['POST create', create],
  ['POST form', form],
];

const index = async (req, reply, app) => {
  return {
    status: 'ok',
  };
};

const list = async (req, reply, app) => {
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
