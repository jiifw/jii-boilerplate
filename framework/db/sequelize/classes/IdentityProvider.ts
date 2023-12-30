import BaseIdentityProvider from '@framework/plugins/authenticate/classes/IdentityProvider';
import User from '@app/sequelize/models/User';
import RequestError from '@framework/classes/RequestError';

interface IdentityRecord {
  [key: string]: any;

  id?: number | string | null;
}

/**
 * IdentityProvider<typeof User> is a generic type that represents the user identity
 */
export default class IdentityProvider<T extends typeof User> extends BaseIdentityProvider<T> {
  /**
   * A method to find the user identity data by the authKey
   * Note: For the error messages, please throw RequestError instance
   * @param tokenData - Token data which contains Authentication key to find user
   */
  async searchIdentity(tokenData: Record<string, any>): Promise<void> {
    const model = await User.findOne({
      where: {
        authKey: tokenData['idt'],
      },
    });

    if (!model) {
      throw new RequestError('Token may invalidated or user not found', 'INVALIDATED_TOKEN');
    }

    this.setIdentity(model);
  }
}
