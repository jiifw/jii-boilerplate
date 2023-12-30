import { Model } from 'sequelize';
import { sequelize } from '@framework/db/sequelize/types';

import use from './../use-trait';

/**
 * Sequelize base model class
 */
export default abstract class BaseModel extends Model<any, any> {
  [key: string | symbol]: any;

  /**
   * List of traits to use */
  public static readonly traits: Array<sequelize.TraitPath> = [];

  /**
   * Initialize model traits
   */
  static initTraits(): void {
    if (!this.traits.length) {
      return;
    }

    this.traits.join(...this.traits);
    use(this, this.traits);
  }
}
