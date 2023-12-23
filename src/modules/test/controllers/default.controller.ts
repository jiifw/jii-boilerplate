// types
import { module } from '@framework/plugins/auto-modules';

export default async (): Promise<module.Controller> => [
  ['/', async () => ({ status: 'ok' })],
];
