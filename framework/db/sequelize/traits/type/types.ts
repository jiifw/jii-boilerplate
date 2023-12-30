import { sequelize } from '@framework/db/sequelize/types';

export interface TypeTrait extends sequelize.Model {
  /**
   * Get type label
   * @returns The label / None
   */
  toTypeLabel?(): string | null;
}

export interface TypeTraitStatic<T extends sequelize.Model> extends sequelize.ModelStatic<T> {
  /**
   * Get type label
   * @param type - Status ID
   * @returns The label / None
   */
  typeLabel?(type: string | number): string | null;

  /**
   * Get types labels
   * @returns Pairs of labels (e.g., <code>{type: label}</code>)
   */
  typeLabels?(): Record<string | number, string>;
}

export type TraitType = sequelize.Trait<TypeTraitStatic<undefined>>;

export interface TypeTraitConfig {
  /** Column name
   * @default 'type'
   */
  column: string;
}
