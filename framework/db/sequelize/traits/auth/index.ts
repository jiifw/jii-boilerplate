import merge from 'deepmerge';
import bcryptjs from 'bcryptjs';
// @ts-ignore
import { nanoid } from 'nanoid';

// utils
import { retrieve } from '@framework/base/config';
import { configKey } from '@framework/db/sequelize';
import { generatePassword, time, generateAuthKey } from './libs/crypto';

// types
import { AuthTraitConfig, TraitType } from './types';

// public types
export type { AuthTraitConfig, AuthTrait, AuthTraitStatic } from './types';

export default <TraitType>function(Model) {
  const config = <AuthTraitConfig>merge({
    passwordResetTokenExpire: (3600 * 24) * 2, // days
    passwordResetTokenLength: 60,
    authKeyLength: 60,
  }, retrieve(configKey, 'traits.auth', {}));

  Model.prototype.setPassword = function(password) {
    const { password: hPassword, hash } = generatePassword(password);
    this.set('password', hPassword);
    this.set('passwordHash', hash);
  };

  Model.prototype.validatePassword = function(password) {
    return bcryptjs.compareSync(password, this.get('passwordHash'));
  };

  Model.prototype.generatePasswordResetToken = function() {
    const code: string = nanoid(config.passwordResetTokenLength);
    this.set('passwordResetToken', `${code}-${time()}`);
  };

  Model.findByPasswordResetToken = async (
    token, findOptions = {}, options = {},
  ) => {
    if (!Model.isPasswordResetTokenValid(token, merge({
      expire: config?.passwordResetTokenExpire,
    }, options))) {
      return null;
    }

    return Model.findOne(merge({
      where: {
        password_reset_token: token,
      },
    }, findOptions));
  };

  Model.isPasswordResetTokenValid = (token, options = {}) => {
    const theToken = String(token).trim();

    if (!theToken) {
      return false;
    }

    const [timestamp] = theToken.split('-').slice(-1);

    if (!timestamp || !Number(timestamp) || isNaN(Number(timestamp))) {
      return false;
    }

    return (Number(timestamp) + Number(
      options?.expire || config.passwordResetTokenExpire,
    )) > time();
  };

  Model.prototype.removePasswordResetToken = function() {
    this.set('passwordResetToken', '');
  };

  Model.prototype.getAuthKey = function() {
    return this.get('authKey');
  };

  Model.prototype.validateAuthKey = function(authKey) {
    return authKey === this.getAuthKey();
  };

  Model.prototype.generateAuthKey = function() {
    this.set('authKey', generateAuthKey(config.authKeyLength));
  };
};
