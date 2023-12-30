import RequestError from '@framework/classes/RequestError';
import { DecodeOptions, DecodeResponse, EncodeResponse } from '@framework/plugins/jwt/types';
import { ServerRequest } from '@framework/typings/server';
import { SignOptions } from 'jsonwebtoken';

interface IdentityRecord {
  [key: string]: any;
  id?: number | string | null;
}

/**
 * IdentityProvider<typeof User> is a generic type that represents the user identity
 */
export default class IdentityProvider<T extends IdentityRecord> {
  /**
   * User identity instance or object
   */
  protected identity: T | IdentityRecord | null = null;

  constructor(protected readonly request: ServerRequest) {
  }

  /**
   * A method to find the user identity data by the authKey
   * Note: For the error messages, please throw RequestError instance
   * @param tokenData - Token data which contains Authentication key to find user
   */
  async searchIdentity(tokenData: Record<string, any>): Promise<void> {
    /*
     * #import RequestError from '@framework/classes/RequestError';
     *
     * // Sample logic
     * const model = await User.findByAuthKey(tokenData['idt']);
     * if ( !model ) {
     *   throw new RequestError('No user found', 'USER_NOT_FOUND');
     * }
     *
     * this.identity = model;
     */
  }

  /**
   * Get user id
   */
  getId(): string | number | null {
    return this.identity?.id || null;
  }

  /**
   * Get user identity instance or object
   */
  getIdentity(): T | IdentityRecord | null {
    return null;
  }

  /**
   * Sets user identity instance or object
   */
  setIdentity(identity: T | IdentityRecord | null): void {
    this.identity = identity;
  }

  /**
   * A method to encode the user identity data to a token
   *
   * Encodes a payload and create JWT token
   */

  async encodeToken(payload: string | object | Buffer | Record<string, any>, options?: Partial<SignOptions>): Promise<EncodeResponse> {
    return this.request.jwt.encode(payload, options);
  }

  /**
   * A method to decode the token and get the user identity data
   *
   * Verify and decodes JWT token
   */
  async decodeToken(token: string, options: Partial<DecodeOptions> = {}): Promise<DecodeResponse> {
    return this.request.jwt.decode(token, options);
  }
}
