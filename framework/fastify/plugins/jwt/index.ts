import JWT from 'jsonwebtoken';
import merge from 'deepmerge';
import ms from 'ms';

// types
import { DecodeResponse, JWTRequestDecorator, JWTOptions } from './types';
import { plugin } from '@typings/plugin';
import { ServerRequest } from '@typings/server';

// utils
import { now, toExpirationMs } from './utils';
import { getValue } from '@framework/env';
import { importPluginConfig } from '@framework/utils/alias-resolver';

/** JWT algorithm method name */
export const JWT_DEFAULT_ALGORITHM: JWT.Algorithm = 'HS512';

export { JWTRequestDecorator };

const initJWTDecorator = (request?: ServerRequest, config: JWTOptions = {}): JWTRequestDecorator => {
  const encode: JWTRequestDecorator['encode'] = (payload, options = {}) => {
    options = merge({
      algorithm: JWT_DEFAULT_ALGORITHM,
      expiresIn: getValue<string>('JWT_EXPIRES_IN', '7d'),
      issuer: getValue<string>('JWT_ISSUER', ''),
      audience: getValue<string>('JWT_AUDIENCE', ''),
    }, config?.encode || {}, <unknown>options);

    let milliseconds;

    try {
      milliseconds = ms(<string>options.expiresIn);
    } catch (e) {
      throw new Error('JWT expires in variable "JWT_EXPIRES_IN" has invalid value');
    }

    const secret = getValue<string>('JWT_SECRET', '').trim();

    if (!secret) {
      throw new Error('JWT secret variable "JWT_SECRET" should not be empty');
    }

    const token: string = JWT.sign(payload, secret, options);

    const issuedAt: string = now();

    return {
      token,
      issuedAt,
      expiresIn: toExpirationMs(issuedAt, milliseconds),
    };
  };

  const decode = (token, options = {}) => {
    options = merge({
      algorithms: [JWT_DEFAULT_ALGORITHM],
      issuer: getValue<string>('JWT_ISSUER', ''),
      audience: getValue<string>('JWT_AUDIENCE', ''),
    }, config?.encode || {}, options || {});


    const secret = getValue<string>('JWT_SECRET', '').trim();

    if (!secret) {
      throw new Error('JWT secret variable "JWT_SECRET" should not be empty');
    }

    try {
      return <DecodeResponse>JWT.verify(token, secret, options);
    } catch (err: any) {
      throw err;
    }
  };

  const parse = (token, options = {}) => {
    options = merge(config?.parse || {}, options || {});
    return JWT.decode(token, options);
  };

  return { encode, decode, parse };
};

export const info: plugin.Info = {
  id: 'jwt',
  name: 'fastify-jwt',
};

export const handler: plugin.Handler = async (server, options) => {
  const config = await importPluginConfig<JWTOptions>(
    info.id, server, merge({ encode: {}, decode: {}, parse: {} }, options),
  );

  server.decorateRequest(info.id, undefined);

  server.addHook('preHandler', async (req: ServerRequest) => {
    req[info.id] = initJWTDecorator(req, config);
  });
};
