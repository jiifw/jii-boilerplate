// types
import { Required } from 'utility-types';
import { Options, Sequelize, Model as SeqModel, ModelStatic as SeqModelStatic } from 'sequelize';

export namespace sequelize {
  export type Connection = Options;

  export type TraitName =
    'attributes'
    | 'auth'
    | 'json'
    | 'pagination-cursor'
    | 'pagination-number'
    | 'status'
    | 'type';

  export type TraitPath = `#framework://${TraitName}` | `#app://${string}`;

  type _PluginOptions = {
    directory: string;
    traits: {
      [name: TraitName | string]: Record<string, any>;
    };
    environment: {
      development: Connection;
      staging: Connection;
      production: Connection;
    };
  }

  export type PluginOptions = Required<_PluginOptions, 'directory' | 'environment'>;

  export interface Model extends SeqModel {
    [key: string | symbol]: any;
  }

  export interface ModelStatic<M extends Model> extends SeqModelStatic<M> {
    [key: string | symbol]: any;
  }

  // export interface GenericTrait<T extends Model> extends ModelStatic<T>{
  export type Trait<T> = (TModel: ModelStatic<Model> & T, sequelize?: Sequelize) => void;
}
