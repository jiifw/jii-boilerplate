// types
import { module } from '@plugins/auto-modules';

export default async (): Promise<module.Controller> => [
  ['/', async () => ({ status: 'ok' })],
];
