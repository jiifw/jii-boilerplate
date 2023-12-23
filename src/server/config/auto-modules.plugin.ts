// types
import { ServerInstance } from '@framework/typings/server';
import { AutoModulesOption } from '@framework/plugins/auto-modules';

export default async (server: ServerInstance): Promise<AutoModulesOption> => ({
  modulesPath: [],
})
