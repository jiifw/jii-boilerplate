import { sequelize } from '@framework/db/sequelize/types';
import BaseModel from '@framework/db/sequelize/classes/BaseModel';

export default interface ModelStatic<T extends BaseModel> extends sequelize.ModelStatic<T> {
  [key: string | symbol]: any;

  /**
   * Get class traits
   */
  get traits(): Array<sequelize.TraitPath>;

  /**
   * Initialize model class traits
   */
  initTraits?(): void;
}
