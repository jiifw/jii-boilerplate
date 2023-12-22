// types
import { ServerInstance } from '@typings/server';
import { AutoModulesOption } from '@plugins/auto-modules';

export default async (server: ServerInstance): Promise<AutoModulesOption> => ({
  modulesPath: [],
})
