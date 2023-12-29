/**
 * Authenticate Plugin definition file
 */
import { FastifyRequest, HTTPMethods } from 'fastify';
import { ServerRequest } from '@framework/typings/server';

/**
 * Options for the plugin
 */
export interface AuthenticateOptions {
  /**
   * Identity class path to use for the token
   * @default '@framework/plugins/authenticate/classes/IdentityProvider'
   */
  identityClass?: string;

  /**
   * Decorator class path to use for access identity object
   * @default '@framework/plugins/authenticate/classes/IdentityDecorator'
   */
  decoratorClass?: string;

  /**
   * Field name to use for the token (in body or query)
   * @default 'auth-token'
   */
  field?: string;

  /**
   * HTTP Header name to use for the token
   * @default 'x-auth-token'
   */
  header?: `x-${string}`;

  /**
   * Bearer token scheme
   * @default 'Bearer'
   */
  scheme?: 'Bearer' | string;

  /**
   * Ignore URLs that match the pattern
   * @example
   * ignoreUrls: ['POST /login', '/users/:id']
   * @default []
   */
  ignoreRoutes?: Array<`${HTTPMethods} /${string}` | `/${string}`>;

  /**
   * Ignore routes that match the pattern<br>
   * <b>Note</b>: Returning false will consider route as non-authentication part.
   * @param router - Request router
   * @param [router.url] - Request route (e.g., '/login')
   * @param [router.method] - HTTP method  (e.g., 'POST')
   * @param request - Server request instance
   *
   * @example
   * onIgnoreRoute: (router): boolean => {
   *   return router.url === '/login' && router.method === 'POST';
   * }
   */
  onIgnoreRoute?(router?: Pick<FastifyRequest['routeConfig'], 'method' | 'url'>, request?: ServerRequest): Promise<boolean>;
}
