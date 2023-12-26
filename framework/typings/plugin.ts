// types
import { ServerInstance } from './server';
import { PluginMetadata } from 'fastify-plugin';

export namespace plugin {
  export interface Info {
    id: Lowercase<string>;
    name: Lowercase<string>;
    metadata?: Omit<PluginMetadata, 'name'>;
  }

  /** Plugin configuration get to store/retrieve from registry */
  export type ConfigKey = string;

  export type Handler = (
    server: ServerInstance, options: Record<string, any>,
  ) => Promise<void>;

  export interface Definition {
    info: Info;
    handler: Handler;
  }
}
