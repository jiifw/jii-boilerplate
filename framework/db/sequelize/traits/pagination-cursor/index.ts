import { makePaginate } from 'sequelize-cursor-pagination';

// types
import { TraitType } from './types';

// public types
export type { PaginationCursorTrait, PaginationCursorTraitStatic } from './types';

export default <TraitType>function(Model) {
  makePaginate(Model, {
    //methodName: 'cursorPaginate',
    primaryKeyField: <string[]>Model.primaryKeyAttributes,
  });

  Model.paginationCursor = Model.paginate;
  delete Model.paginate;
};
