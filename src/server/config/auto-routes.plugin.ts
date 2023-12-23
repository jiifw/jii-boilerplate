// types
import { ServerInstance } from '@framework/typings/server';
import { AutoControllerOptions } from '@framework/plugins/auto-controllers';

export default async (server: ServerInstance): Promise<AutoControllerOptions> => ({
  controllersPath: [],
})
