import { sequelize } from '@framework/db/sequelize/types';

export interface StatusTrait extends sequelize.Model {
  /**
   * Get status label
   * @returns The label / None
   */
  toStatusLabel(): string | null;
}

export interface StatusTraitStatic<T extends sequelize.Model> extends sequelize.ModelStatic<T> {
  /**
   * Get status label
   * @param type - Status ID
   * @returns The label / None
   */
  statusLabel(type: string | number): string | null;

  /**
   * Get statuses labels
   * @returns Pairs of labels (e.g., <code>{status: label}</code>)
   */
  statusLabels(): Record<string | number, string>;
}

export type TraitType = sequelize.Trait<StatusTraitStatic<undefined>>;

export interface StatusTraitConfig {
  /** Column name
   * @default 'status'
   */
  column: string;
}
