// types
import { JwtPayload, SignOptions, VerifyOptions, DecodeOptions as JWTDecodeOptions } from 'jsonwebtoken';

export type DecodeOptions = VerifyOptions & Record<string, any>;
export type DecodeResponse = JwtPayload & Record<string, any>;

export interface EncodeResponse {
  token: string;
  issuedAt: string;
  expiresIn: string;
}

export type JWTOptions = {
  encode?: Partial<SignOptions>;
  decode?: Partial<DecodeOptions>;
  parse?: Partial<JWTDecodeOptions>;
}

export interface JWTRequestDecorator {
  /**
   * Encodes a payload and create JWT token
   * @param payload - Payload data
   * @param options - Additional options
   * @throws Failed to create token
   *
   * @example
   * const tokenData = request.jwt.encode({
   *   // add props here
   * });
   * console.log('Token', tokenData);
   */
  encode(payload: string | Buffer | object | Record<string, any>, options?: Partial<SignOptions>): EncodeResponse;

  /**
   * Verify and decodes JWT token
   * @param token - Token to be decoded
   * @param options - Additional options, see below
   * @return Decoded token data
   * @throws Failed to validate, verify or decode token
   *
   * @example
   * const tokenData = request.jwt.decode('<token>');
   * console.log('Token payload', tokenData);
   */
  decode(token: string, options?: Partial<DecodeOptions>): DecodeResponse;

  /**
   * Decode JWT token without verifying it
   * @param token - Token to be decoded
   * @param options - Additional options
   * @return Decoded token data
   * @throws Failed to validate, verify or decode token
   *
   * @example
   * const tokenData = request.jwt.parseOnly('<token>');
   * console.log('Token payload', tokenData);
   */
  parse(token: string, options: Partial<JWTDecodeOptions>): JwtPayload | string;
}
