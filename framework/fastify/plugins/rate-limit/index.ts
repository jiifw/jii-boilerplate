/**
 * Fastify requests rate limiter plugin
 * In case a client reaches the maximum number of allowed requests, an error will be
 * sent to the user with the status code set to 429
 */

import merge from 'deepmerge';
import rateLimitInitializer, { RateLimitOptions } from '@fastify/rate-limit';

// utils
import { getNumberValue } from '@framework/env';

// types
import { importPluginConfig } from '@framework/utils/alias-resolver';
import { plugin } from '@typings/plugin';

// public types
export { RateLimitOptions };

export const info: plugin.Info = {
  id: 'rate-limit',
  name: 'fastify-rate-limit',
};

export const handler: plugin.Handler = async (server, options) => {
  const max = getNumberValue('RATE_LIMITER_MAX_REQUESTS', 10000);
  const minutes = getNumberValue('RATE_LIMITER_TIME_WINDOW', 60);

  /** @type {number} */
  const timeWindow = minutes * (/** 1000 * 60 */ 60000);

  const config = await importPluginConfig<RateLimitOptions>(
    info.id, server, merge({
      max, timeWindow,
    }, options),
  );

  // Limit requests/s rate
  server.register(rateLimitInitializer, config);
};
