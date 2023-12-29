import { Class } from 'utility-types';

/**
 * @class IdentityDecorator
 * @property {boolean} isGuest - Either a guest or authenticated user
 * @property {string|number|null} id - Authenticated user ID
 * @property {object} identity - User model instance
 */
export default class IdentityDecorator<T extends Class<T> | any> {
  constructor(
    public readonly isGuest: boolean,
    public readonly id: string | number | null,
    public readonly identity: InstanceType<T | any> | null,
  ) {
  }
}
