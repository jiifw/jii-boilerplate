import { sequelize } from '@framework/db/sequelize/types';

export interface AttributesTrait extends sequelize.Model {
  /**
   * Returns attribute values.
   * @methodOf GeneralMethodsTrait
   * @param names=[] - List of attributes whose value needs to be returned.
   * Defaults to null, meaning all attributes listed in [[attributes()]] will be returned.
   * If it is an array, only the attributes in the array will be returned.
   * @param except=[] - List of attributes whose value should NOT be returned.
   * @returns Attribute values (name => value).
   */
  attributesValue?(names?: string[], except?: string[]): Record<string, string>;
}

export interface AttributesTraitStatic<T extends sequelize.Model> extends sequelize.ModelStatic<T> {
  /**
   * @static
   * Returns the attribute hints.
   *
   * Attribute hints are mainly used for display purpose. For example, given an attribute
   * `isPublic`, we can declare a hint `Whether the post should be visible for not logged in users`,
   * which provides user-friendly description of the attribute meaning and can be displayed to end users.
   *
   * Unlike label hint will not be generated, if its explicit declaration is omitted.
   *
   * Note, in order to inherit hints defined in the parent class, a child class needs to
   * merge the parent hints with child hints using functions such as `merge`.
   *
   * @returns Attribute hints (name => hint)
   */
  attributeHints?(): Record<string, string>;

  /**
   * Returns the attribute names
   * @param except=[] - List of attributes whose value should NOT be returned.
   * @returns Attribute names
   */
  attributesName?(except?: string[]): string[];

  /**
   * Returns the attribute labels.
   *
   * Attribute labels are mainly used for display purpose. For example, given an attribute
   * `firstName`, we can declare a label `First Name` which is more user-friendly and can
   * be displayed to end users.
   *
   * Note, in order to inherit hints defined in the parent class, a child class needs to
   * merge the parent hints with child hints using functions such as `merge`.
   *
   * @returns Attribute names
   */
  attributeLabels?(): Record<string, string>;
}

export type TraitType = sequelize.Trait<AttributesTraitStatic<AttributesTrait>>;
