import { FindOptions } from 'sequelize';
import { sequelize } from '@framework/db/sequelize/types';

export interface PaginationNumberTrait extends sequelize.Model {
}

interface NumberPaginationResult<T extends object> {
  /** No. of records */
  total: number;
  /** List of models */
  rows: T[];
  /** The paginate `meta` has the following properties */
  meta: {
    /** Total pages count */
    pageCount: number;
    /** Current page */
    current: number | null;
    /** Previous page */
    previous: number | null;
    /** Next page */
    next: number | null;
    /** First page */
    first: number | null;
    /** Last page */
    last: number | null;
  };
}

export interface NumberPaginationTraitConfig {
  /**
   * Current page
   * @default 1
   */
  current: number;
  /**
   * Limit of rows per page
   * @default 20
   */
  perPage: number;
}

export interface PaginationNumberTraitStatic<T extends sequelize.Model> extends sequelize.ModelStatic<T> {
  paginationNumber(findOptions?: Partial<FindOptions<T>>, options?: Partial<NumberPaginationTraitConfig>): Promise<NumberPaginationResult<T>>;
}

export type TraitType = sequelize.Trait<PaginationNumberTraitStatic<undefined>>;
