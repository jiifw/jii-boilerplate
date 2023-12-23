/**
 * Fastify access token retriever from request
 */

import merge from 'deepmerge';

// types
import { AccessTokenRequestDecorator } from './types';
import { ServerRequest } from '@framework/typings/server';
import { plugin } from '@framework/typings/plugin';

export { AccessTokenRequestDecorator };

/** Token field name */
export const TOKEN_FIELD_NAME: string = 'access_token';

/** Token header name */
export const TOKEN_HEADER_NAME: string = 'x-access-token';

const CONTENT_TYPE_FORM_URLENCODED: string = 'application/x-www-form-urlencoded';
const CONTENT_TYPE_FORM_MULTIPART: string = 'multipart/form-data';

const initRequestDecorator = (request: ServerRequest): AccessTokenRequestDecorator => {
  const header = (options) => {
    options = merge({ header: TOKEN_HEADER_NAME }, options || {});
    return (<string>request.headers?.[options.header])?.trim() || null;
  };

  const query = (options) => {
    options = merge({ name: TOKEN_FIELD_NAME }, options || {});
    return (<string>request.query?.[options.name])?.trim() || null;
  };

  const body = (options) => {
    options = merge({ name: TOKEN_FIELD_NAME }, options || {});
    return String(request.body?.[options.name] || '')?.trim() || null;
  };

  const authBearer = (options) => {
    options = merge({ scheme: 'Bearer' }, options || {});
    if (!request.headers.hasOwnProperty('authorization')) {
      return null;
    }

    const [
      scheme = null, token = null,
    ] = request.headers?.authorization?.trim().split(' ');

    return !scheme || scheme.toLowerCase() !== options?.scheme?.toLowerCase()
      ? null
      : token;
  };

  const formBody = (options) => {
    options = merge({ name: TOKEN_FIELD_NAME }, options || {});
    const contentType: string = request.headers['content-type'] || '';

    if (contentType.startsWith(CONTENT_TYPE_FORM_URLENCODED)
      || contentType.startsWith(CONTENT_TYPE_FORM_MULTIPART)) {
      return String(request.body?.[options.name] || '')?.trim() || null;
    }

    return null;
  };

  const retrieve = (options) => {
    for (const retriever of [query, body, header, authBearer, formBody]) {
      const token = retriever(options);
      if (token) {
        return <string>token;
      }
    }

    return null;
  };

  return {
    header, query, body,
    authBearer, formBody, retrieve,
  };
};

export const info: plugin.Info = {
  id: 'access-token',
  name: 'fastify-access-token',
};

export const handler: plugin.Handler = async (server) => {
  server.decorateRequest('accessToken', undefined);

  server.addHook('onRequest', async (req: ServerRequest) => {
    req.accessToken = initRequestDecorator(req);
  });
};
