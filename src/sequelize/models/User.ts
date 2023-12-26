import { DataTypes } from 'sequelize';

// utils
import { getInstance } from '@framework/db/sequelize/instance';
import use from '@framework/db/sequelize/use-trait';

// types
import { UserModel, UserModelStatic } from './User.types';

/**
 * User model
 * @class User
 */
const User = <UserModelStatic<UserModel>>getInstance().define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
  schema: 'public',
  tableName: 'users',
  timestamps: false,
  createdAt: false,
});

//<editor-fold desc="Status constants">
User.STATUS_ACTIVE = 10;
User.STATUS_ARCHIVED = 5;
User.STATUS_DELETED = 0;
//</editor-fold>

// traits
use(User, [
  `#framework://attributes`,
  `#framework://status`,
  `#framework://type`,
  //`#framework://json`,
  //`#framework://pagination-number`,
]);

export default <typeof User>User;
