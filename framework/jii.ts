// utils
import { retrieve } from '@framework/base/di';

// types
import { ServerInstance } from '@framework/typings/server';

interface IJii {
  app?: ServerInstance;
}

export default new class Jii implements IJii {
  get app() {
    const server = retrieve<ServerInstance>('appServerInstance');

    if (server) {
      return server;
    }

    throw new Error('Server is not initialized yet');
  }
}
