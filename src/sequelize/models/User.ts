import { DataTypes } from 'sequelize';

// classes
import BaseModel from '@framework/db/sequelize/classes/BaseModel';

// utils
import { getInstance } from '@framework/db/sequelize/instance';

// types
import { sequelize } from '@framework/db/sequelize/types';
import { UserModel, UserModelStatic } from './User.types';

/**
 * User model
 * This is the model class for table "jii.public.users"
 */
const User = <UserModelStatic<UserModel>>class User extends BaseModel implements UserModel {
  /** List of traits to use */
  public static readonly traits: Array<sequelize.TraitPath> = [
    `#framework://attributes`,
    `#framework://status`,
    `#framework://type`,
    //`#framework://json`,
    //`#framework://pagination-number`,
  ];

  /** Status as active */
  static STATUS_ACTIVE: number = 10;

  /** Status as inactive */
  static STATUS_INACTIVE: number = 9;

  /** Status as archived */
  static STATUS_ARCHIVED: number = 5;

  /** Status as deleted */
  static STATUS_DELETED: number = 0;
};

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
  sequelize: getInstance(),
  schema: 'public',
  tableName: 'users',
  timestamps: false,
  createdAt: false,
});

// traits
User.initTraits();

export default <typeof User>User;
