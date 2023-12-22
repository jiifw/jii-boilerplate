import { parse } from 'node:url';

// utils
import { getArrayValue } from '@framework/env';

/** Get origin from request */
export const getOrigin = (origin: string): boolean => {
  // Set true when non-browser request
  if (!origin) {
    return true;
  }

  const { hostname } = parse(origin, false);

  /** Whitelist origins (domains only) */
  const wlOrigins = getArrayValue<string>('SERVER_CORS_ORIGINS', ['localhost']);

  for (const wlOrigin of wlOrigins) {
    if (wlOrigin.includes(hostname)) {
      return true;
    }
  }

  return false;
};
