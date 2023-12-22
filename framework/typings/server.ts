// types
import { FastifyHttpOptions, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Handler } from '@fastify/middie';
import * as AppServer from '@app/server/typings/server';

interface MiddlewareEngine {
  use(fn: Handler): ThisType<ServerInstance>;

  use(route: string, fn: Handler): ThisType<ServerInstance>;

  use(routes: string[], fn: Handler): ThisType<ServerInstance>;
}

export type ServerInstance = Partial<FastifyInstance
  & AppServer.ServerInstance
  & MiddlewareEngine & {}
>;

export type ServerRequest = Partial<FastifyRequest>
  & AppServer.ServerRequest
  & {};

export type ServerReply = Partial<FastifyReply
  & AppServer.ServerReply & {}
>;

export type ServerHTTPOptions = Partial<FastifyHttpOptions<undefined>
  & AppServer.ServerHTTPOptions
  & {}
>;
