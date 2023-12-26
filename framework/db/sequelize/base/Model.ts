import { Model as SeqModel } from 'sequelize';
import { sequelize } from './../types';

export class Model extends SeqModel {
}

export interface ModelStatic<T extends Model> extends sequelize.ModelStatic<T> {
}
