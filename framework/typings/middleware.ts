/** Middleware packages */
export enum MiddlewarePackage {
  FavIcon = 'fastify-favicon',
  GracefulShutdown = 'fastify-graceful-shutdown',
  Accepts = '@fastify/accepts',
  UrlData = '@fastify/url-data',
  Cookie = '@fastify/cookie',
  Formbody = '@fastify/formbody',
  Multipart = '@fastify/multipart',
}

/** Middleware middlewares' */
export enum MiddlewareMiddleware {
  XssProtection = 'x-xss-protection',
}

/** Middleware plugins */
export enum MiddlewarePlugin {
  CORS = '@plugins/cors',
  RateLimit = '@plugins/rate-limit',
  AutoControllers = '@plugins/auto-controllers',
  AutoModules = '@plugins/auto-modules',
  Swagger = '@plugins/swagger',
  Session = '@plugins/session',
  AccessToken = '@plugins/access-token',
  Jwt = '@plugins/jwt',
  I18n = '@plugins/i18n',
}

/** Core middleware paths */
export type Middleware =
  Lowercase<
    typeof MiddlewarePackage [keyof typeof MiddlewarePackage]
    | typeof MiddlewareMiddleware [keyof typeof MiddlewareMiddleware]
    | typeof MiddlewarePlugin [keyof typeof MiddlewarePlugin]
    | string
  >;

