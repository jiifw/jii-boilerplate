// types
import { applyMiddleware } from '@framework/helpers/middleware';
import { ServerInstance } from '@typings/server';

export default async (server: ServerInstance): Promise<void> => {
  await applyMiddleware([
    /** Register plugins/middleware here */

    //{ path: '@plugins/swagger', type: 'plugin' },
    //{ path: '@plugins/session', type: 'plugin' },
    //{ path: '@plugins/access-token', type: 'plugin' },
    //{ path: '@plugins/jwt', type: 'plugin' },
    //{ path: '@plugins/i18n', type: 'plugin' },
  ], server);
}
