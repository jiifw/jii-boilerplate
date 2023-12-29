// types
import * as fastify from 'fastify';
import { Handler } from '@fastify/middie';
import { URIComponent } from 'fast-uri';
import * as AppServer from '@app/server/typings/server';
import Jii from '@framework/Jii';

declare global {
  var Jii: Jii;
}

declare namespace server {
  export type ServerInstance = Partial<
    fastify.FastifyInstance
    & AppServer.ServerInstance
    & MiddlewareEngine & {
    [key: string]: any;
  }
  >;

  export type ServerRequest = Partial<fastify.FastifyRequest>
    & AppServer.ServerRequest
    & {
    [key: string]: any;
  };

  export type ServerReply = Partial<fastify.FastifyReply
    & AppServer.ServerReply
    & {
    [key: string]: any;
  }
  >;

  export type ServerHTTPOptions = Partial<fastify.FastifyHttpOptions<undefined>
    & AppServer.ServerHTTPOptions
    & {
    [key: string]: any;
  }
  >;
}

interface MiddlewareEngine {
  use(fn: Handler): ThisType<ServerInstance>;

  use(route: string, fn: Handler): ThisType<ServerInstance>;

  use(routes: string[], fn: Handler): ThisType<ServerInstance>;
}

export interface ServerInstance extends server.ServerInstance {
}

export interface ServerRequest extends server.ServerRequest {
  urlData?(): URIComponent;
}

export interface ServerReply extends server.ServerReply {
}

export interface ServerHTTPOptions extends server.ServerHTTPOptions {
}
