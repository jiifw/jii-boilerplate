// types
import { applyMiddleware } from '@framework/helpers/middleware';
import { ServerInstance } from '@framework/typings/server';

export default async (server: ServerInstance): Promise<void> => {
  await applyMiddleware([
    /** Register plugins/middleware here */

    //{ path: '@framework/plugins/swagger', type: 'plugin' },
    //{ path: '@framework/plugins/session', type: 'plugin' },
    //{ path: '@framework/plugins/access-token', type: 'plugin' },
    //{ path: '@framework/plugins/jwt', type: 'plugin' },
    //{ path: '@framework/plugins/i18n', type: 'plugin' },
  ], server);
}
