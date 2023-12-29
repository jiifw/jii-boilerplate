/**
 * Authenticate plugin
 */

import merge from 'deepmerge';

// utils
import { importPluginConfig } from '@framework/base/config';

// types
import { FastifyRequest } from 'fastify';
import { ServerRequest } from '@framework/typings/server';
import { plugin } from '@framework/typings/plugin';
import { AuthenticateOptions } from './types';
import IdentityDecorator from './classes/IdentityDecorator';
import IdentityProvider from './classes/IdentityProvider';

// public types
export { AuthenticateOptions };

/**
 * Authenticate plugin info
 */
export const info: plugin.Info = {
  id: 'authenticate',
  name: 'authenticate-plugin',
  metadata: {
    decorators: {
      request: ['accessToken', 'jwt'],
    },
  },
};

const canIgnoreRoute = (routeConfig: Pick<FastifyRequest['routeConfig'], 'method' | 'url'>, routes: Array<string>): boolean => {
  if (!routes.length) {
    return false;
  }

  for (const expression of routes) {
    if (!/^([A-Z]+\s+)?\/.+$/i.test(expression)) {
      throw new Error('Invalid ignored route: ' + expression);
    }

    if (!expression.includes(' ') && routeConfig.url === expression) {
      return true;
    }

    const [method = '', route = ''] = expression.split(' ');
    if (method.toUpperCase() === String(routeConfig.method).toUpperCase()
      && routeConfig.url === route) {
      return true;
    }
  }

  return false;
};

/**
 * Authenticate logic handler
 */
export const handler: plugin.Handler = async (server, options) => {
  const config = await importPluginConfig<AuthenticateOptions>(info.id, server, merge({
    identityClass: '@framework/plugins/authenticate/classes/IdentityProvider',
    decoratorClass: '@framework/plugins/authenticate/classes/IdentityDecorator',
    ignoreRoutes: [],
    async onIgnoreRoute() {
      return true;
    },
    field: 'auth-token',
    header: 'x-auth-token',
    scheme: 'Bearer',
  }, options));

  let decorator = Jii.createObject<IdentityDecorator<any>>(
    config.decoratorClass, [false, null, null],
  );

  server.addHook('onRequest', async (req: ServerRequest) => {
    if (canIgnoreRoute(req.routeConfig, config.ignoreRoutes)) {
      return;
    }

    if ('function' === typeof config.onIgnoreRoute
      && (await config.onIgnoreRoute(req.routeConfig, req))) {
      return;
    }

    const token = req.accessToken.retrieve({
      name: config.field, header: config.header, scheme: config.scheme,
    });

    if (!token) {
      server.log.error('No authorisation token was provided');
      return;
    }

    const provider = Jii.createObject<IdentityProvider<object>>(
      config.decoratorClass, [req],
    );

    const decoded = await provider.decodeToken(token, {});

    await provider.searchIdentity(decoded);

    decorator = Jii.createObject<IdentityDecorator<any>>(config.decoratorClass, [
      Boolean(provider.getId()), provider.getId(), provider.getIdentity(),
    ]);
  });

  server.decorate('auth', decorator);
};
