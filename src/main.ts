/**
 * Main server bootstrapper
 */

'use strict';

import invoker from '@framework/server';

// Bootstrapper
(async (): Promise<void> => {
  await invoker();
})();
