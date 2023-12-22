// types
import { ServerInstance } from '@typings/server';
import { AutoControllerOptions } from '@plugins/auto-controllers';

export default async (server: ServerInstance): Promise<AutoControllerOptions> => ({
  controllersPath: [],
})
