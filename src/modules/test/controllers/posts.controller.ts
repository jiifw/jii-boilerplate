// types
import { module } from '@plugins/auto-modules';

export default async (): Promise<module.Controller> => [
  ['index', async () => ({status: 'ok'})],
  ['list', actionList],
  ['POST create', actionCreate],
  ['POST form', actionForm],
];

const actionList = async (req) => {
  return {
    header: req.accessToken.header(),
    query: req.accessToken.query(),
    authBearer: req.accessToken.authBearer(),
    body: req.accessToken.body(),
  };
};

const actionCreate = async (req) => {
  return {
    header: req.accessToken.header(),
    query: req.accessToken.query(),
    authBearer: req.accessToken.authBearer(),
    body: req.accessToken.body(),
  };
};

const actionForm = async (req) => {
  return {
    formBody: req.accessToken.formBody(),
    retrieve: req.accessToken.retrieve(),
  };
};
