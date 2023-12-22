// types
import { ServerInstance, ServerRequest, ServerReply } from '@typings/server';
import { RouteOptions, HTTPMethods } from 'fastify';

/** Routes option to pass all module actions */
export interface ModuleRouteOptions {
  /** Set module specific actions prefix */
  prefix: string;
  /** Options to pass on each controller route */
  options?: Partial<RouteOptions>;

  /** A callback to trigger when module's controller is being registered. */
  onRegister?(url: string, options: Partial<RouteOptions>): Promise<Partial<RouteOptions>>;
}

export interface ModuleConfiguration {
  [key: string]: any;

  /** controllers dir path */
  controllersPath?: Array<string>;
  /** Module route path */
  id?: string;
  /** Options to pass on each controller */
  routeOptions?: Partial<ModuleRouteOptions>;

  /** A callback to trigger when module initialed. */
  onInitialize?(server: ServerInstance): Promise<void>;
}

export interface ControllerConfiguration extends ModuleConfiguration {
  moduleRoute: Lowercase<string>;
  controllerRoute: Lowercase<string>;
  route: Lowercase<string>;
}

export interface AutoModulesOption {
  /** modules dir path */
  modulesPath?: Array<Lowercase<string>>;
}

export type ModuleConfig = ModuleConfiguration & {
  dirPath: string;
}

export interface ControllerMapping {
  name: string;
  route: string;
  path: string;
}

export type ModuleMapping = ModuleConfig & {
  controllers: Array<ControllerMapping>;
}

export namespace module {
  export type Url = Required<Lowercase<string> | `${HTTPMethods} ${Lowercase<string>}`>;
  type HandlerReturns = any | Promise<any>;
  export type HandlerEmpty = () => HandlerReturns;
  type HandlerCompact = (req?: ServerRequest) => HandlerReturns;
  type HandlerExpended = (req?: ServerRequest, reply?: ServerReply) => HandlerReturns;
  type HandlerFull = (req?: ServerRequest, reply?: ServerReply, server?: ServerInstance) => HandlerReturns;
  export type Handler = HandlerCompact | HandlerExpended | HandlerFull;
  export type Route = [Url, HandlerEmpty] | [Url, HandlerEmpty, RouteOptions] | [Url, Handler] | [Url, Handler, RouteOptions];
  export type Controller = Array<Route | []>;
}
