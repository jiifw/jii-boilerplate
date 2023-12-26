// types
import { FindOptions } from 'sequelize';
import { sequelize } from '@framework/db/sequelize/types';

export interface AuthTrait extends sequelize.Model {
  /**
   * Generates password hash from password and sets it to the model
   * @name setPassword
   * @param password - Password to set
   * @returns Whether the password is correct
   */
  setPassword(password: string): void;

  /**
   * Verifies a password against a hash.
   * @param password - Password to verify
   * @returns Whether the password is correct
   */
  validatePassword(password: string): void;

  /**
   * Generates new password reset token
   */
  generatePasswordResetToken(): void;

  /**
   * Removes password reset token
   */
  removePasswordResetToken(): void;

  /**
   * Returns a key that can be used to check the validity of a given identity ID.
   */
  getAuthKey(): string;

  /**
   * Validates the given auth key
   * @param authKey - The given auth key
   * @returns True when valid / False otherwise
   */
  validateAuthKey(authKey: string): boolean;

  /**
   * Generates a token authentication key
   */
  generateAuthKey(): void;
}

export interface AuthTraitStatic<T extends sequelize.Model>
  extends sequelize.ModelStatic<T> {
  /**
   * Removes password reset token
   * @param token - Password reset token
   * @param [findOptions={}] - Sequelize find options
   * @param [options={}] - Additional options
   * @return Promise instance (Found record / Not found)
   */
  findByPasswordResetToken<T extends sequelize.Model>(
    token: string, findOptions?: Partial<FindOptions>, options?: Partial<{
      /** Password reset token expire in seconds (Defaults to 3600) */
      expire?: number;
    }>,
  ): Promise<T | null>;

  /**
   * Finds out if password reset token is valid
   * @param token - Password reset token
   * @param [options={}] - Additional options
   * @returns True when valid / False otherwise
   */
  isPasswordResetTokenValid(token: string, options?: Partial<{
    /** Password reset token expire in seconds (Defaults to 3600) */
    expire: number;
  }>): boolean;
}

export type TraitType = sequelize.Trait<AuthTraitStatic<undefined>>;

export interface AuthTraitConfig {
  /** Password token expiry in seconds */
  passwordResetTokenExpire: number; // days
  /** Password token chars length */
  passwordResetTokenLength: number;
  /** Authorization key chars length */
  authKeyLength: number;
}
