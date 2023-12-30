import { sequelize } from '@framework/db/sequelize/types';
import { Path } from 'object-path';

export interface JSONTrait extends sequelize.Model {
  /**
   * Get json attribute value
   * @param column - JSON Attribute name
   * @param path - Path to the property followed by dots (.) element
   * @param [defaultValue] - The default value to be returned if the specified array key does not exist.
   * Not used when getting value from an object.
   * @returns The value of the element if found, default value otherwise
   */
  getJsonAttributeValue?(column: string, path?: Path, defaultValue ?: any): any;

  /**
   * Set json attribute value
   * @param column - JSON Attribute name
   * @param path - Key name of the property followed by dots (.) element
   * @param value - The value to be written
   */
  setJsonAttributeValue?(column: string, path: Path, value: any): void;

  /**
   * Get json value
   * @param path - Path to the property followed by dots (.) element
   * @param [defaultValue] - The default value to be returned if the specified array key does not exist. Not used when
   * getting value from an object.
   * @returns The value of the element if found, default value otherwise
   */
  getJsonValue?(path: Path, defaultValue?: any): any;

  /**
   * Check that json path exists
   * @param path - Path to the property followed by dots (.) element
   * getting value from an object.
   * @return {boolean} - True when exist / False otherwise
   */
  hasJsonPath?(path: Path): boolean;

  /**
   * Set json value
   * @param path - Path to the property followed by dots (.) element
   * @param {(string|number|object|array|*)} value the value to be written
   */
  setJsonValue?(path: Path, value: any): void;

  /**
   * Remove json by path
   * @param path - Path to the property followed by dots (.) element
   */
  removeJsonPath?(path: Path): void;

  /**
   * Replace json attribute values
   * @param values the value to be written
   */
  setJsonValues?(values: any): void;

  /**
   * Overwrite json attribute value
   * @param column - JSON Attribute name
   * @param path - Path to the property followed by dots (.) element
   * @param value - The value to be written
   */
  overwriteJsonAttribute?(column, path: Path, value: any): void;

  /**
   * Overwrite json attribute value
   * @param path - Path to the property followed by dots (.) element
   * @param value - The value to be written
   */
  overwriteJsonValue?(path: Path, value: any): void;

  /**
   * Increase or decrease json counter value
   * @param path - Path to the property followed by dots (.) element
   */
  updateJsonCounter?(path: Path): void;
}

export interface JSONTraitStatic<T extends sequelize.Model> extends sequelize.ModelStatic<T> {
  /**
   * The json attribute
   * @default 'meta'
   */
  jsonbAttribute?: string;
}

export type TraitType = sequelize.Trait<JSONTraitStatic<undefined>>;
