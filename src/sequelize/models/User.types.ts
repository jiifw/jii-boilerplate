// types
import BaseModel from '@framework/db/sequelize/classes/BaseModel';
import ModelStatic from '@framework/db/sequelize/interfaces/ModelStatic';

// traits types
import { AttributesTrait, AttributesTraitStatic } from '@framework/db/sequelize/traits/attributes';
import { JSONTrait, JSONTraitStatic } from '@framework/db/sequelize/traits/json';
import { AuthTrait, AuthTraitStatic } from '@framework/db/sequelize/traits/auth';
import { PaginationCursorTrait, PaginationCursorTraitStatic } from '@framework/db/sequelize/traits/pagination-cursor';
import { PaginationNumberTrait, PaginationNumberTraitStatic } from '@framework/db/sequelize/traits/pagination-number';
import { StatusTrait, StatusTraitStatic } from '@framework/db/sequelize/traits/status';
import { TypeTrait, TypeTraitStatic } from '@framework/db/sequelize/traits/type';

export interface UserModel extends BaseModel,
  PaginationCursorTrait,
  PaginationNumberTrait,
  AttributesTrait,
  JSONTrait,
  AuthTrait,
  TypeTrait,
  StatusTrait {
  id?: number;
}

export interface UserModelStatic<T extends UserModel> extends ModelStatic<T>,
  PaginationCursorTraitStatic<T>,
  PaginationNumberTraitStatic<T>,
  AttributesTraitStatic<T>,
  JSONTraitStatic<T>,
  AuthTraitStatic<T>,
  TypeTraitStatic<T>,
  StatusTraitStatic<T> {
  //<editor-fold desc="Status constants">
  /**
   * @default 10
   */
  STATUS_ACTIVE: number;
  /**
   * @default 5
   */
  STATUS_ARCHIVED: number;
  /**
   * @default 0
   */
  STATUS_DELETED: number;
  //</editor-fold>
}
