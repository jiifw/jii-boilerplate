// types
import { ServerInstance } from '@framework/typings/server';
import { AuthenticateOptions } from '@framework/plugins/authenticate';

export default async (server: ServerInstance): Promise<AuthenticateOptions> => ({
  // identityClass: '@framework/plugins/authenticate/classes/IdentityProvider',
  // decoratorClass: '@framework/plugins/authenticate/classes/IdentityDecorator',
  // ignoreRoutes: [],
  // onIgnoreRoute: async () => true,
  // field: 'auth-token',
  // header: 'x-auth-token',
  // scheme: 'Bearer',
})
