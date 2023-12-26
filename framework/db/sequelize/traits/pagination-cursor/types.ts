import { sequelize } from '@framework/db/sequelize/types';
import { PaginateOptions, PaginationConnection } from 'sequelize-cursor-pagination';

export interface PaginationCursorTrait extends sequelize.Model {
}

export interface PaginationCursorTraitStatic<T extends sequelize.Model> extends sequelize.ModelStatic<T> {
  /**
   * Cursor-based pagination query
   * @see https://github.com/Kaltsoon/sequelize-cursor-pagination#how-to-use
   */
  paginationCursor(options: PaginateOptions<T>): Promise<PaginationConnection<T>>;
}

export type TraitType = sequelize.Trait<PaginationCursorTraitStatic<undefined>>;
