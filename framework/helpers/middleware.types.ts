// types
import { ServerInstance } from '@typings/server';
import { Required } from 'utility-types';
import { Middleware as MiddlewarePath } from '@typings/middleware';

export type MiddlewareType = 'middleware' | 'plugin' | 'callback' | 'after' | 'register';

type Middleware = {
  type: MiddlewareType;
  description?: string;
}

export type MiddlewarePlugin<T> = Required<Middleware & {
  path: MiddlewarePath;
  config?: T | Record<string, any>;
}, 'path' | 'type'>;

export type MiddlewareMiddleware<T> = Required<Middleware & {
  path: MiddlewarePath;
  config?: T | Record<string, any>;
}, 'path' | 'type'>;

export type MiddlewareRegister<T> = Required<Middleware & {
  path: MiddlewarePath;
  config?: T | Record<string, any>;
}, 'path' | 'type'>;

export type MiddlewareCallback<T> = Required<Middleware & {
  handler(server: ServerInstance): Promise<void>;
  handler(server: ServerInstance, config: Record<string, any>): Promise<void>;
  config?: T | Record<string, any>;
}, 'handler' | 'type'>;

export type MiddlewareAfter = Required<Middleware & {
  handler: (err: Error | null) => void;
}, 'handler' | 'type'>;

export type Registry<T> = Array<(
  MiddlewarePlugin<T>
  | MiddlewareMiddleware<T>
  | MiddlewareRegister<T>
  | MiddlewareCallback<T>
  | MiddlewareAfter
  )>;
