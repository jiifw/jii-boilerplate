import objectPath from 'object-path';
import merge from 'deepmerge';

// types
import { TraitType } from './types';

// public types
export type { JSONTrait, JSONTraitStatic } from './types';

export default <TraitType>function(Model) {
  Model.jsonbAttribute = 'meta';

  Model.prototype.getJsonAttributeValue = function(column, key, defaultValue = null) {
    return objectPath.get(this.get(column), key, defaultValue);
  };

  Model.prototype.setJsonAttributeValue = function(column, path, value) {
    const newData = {};
    objectPath.set(newData, path, value);

    this.set(column, merge(
      this.get(column) || {},
      newData,
    ));
    this.changed(Model.jsonbAttribute, true);
  };

  Model.prototype.overwriteJsonAttribute = function(column, path, value) {
    let attrValue = { ...(this.get(column) || {}) };
    objectPath.set(attrValue, path, value, false);
    this.set(column, attrValue);
    this.changed(column, true);
  };

  Model.prototype.getJsonValue = function(path, defaultValue = null) {
    return objectPath.get(this.get(Model.jsonbAttribute), path, defaultValue);
  };

  Model.prototype.hasJsonPath = function(path) {
    return objectPath.has(this.get(Model.jsonbAttribute), path);
  };

  Model.prototype.setJsonValue = function(path, value) {
    let newData = {};
    objectPath.set(newData, path, value);

    this.set(Model.jsonbAttribute, merge(
      this.get(Model.jsonbAttribute) || {},
      newData,
    ));
    this.changed(Model.jsonbAttribute, true);
  };

  Model.prototype.removeJsonPath = function(path) {
    const newData = { ...(this.get(Model.jsonbAttribute) || {}) };
    objectPath.del(newData, path);

    this.set(Model.jsonbAttribute, newData);
    this.changed(Model.jsonbAttribute, true);
  };

  Model.prototype.setJsonValues = function(values = {}) {
    const updated = merge(
      this.get(Model.jsonbAttribute) || {},
      values,
    );

    this.set(Model.jsonbAttribute, updated);
    this.changed(Model.jsonbAttribute, true);
  };

  Model.prototype.overwriteJsonValue = function(path, value) {
    let attrValue = this.get(Model.jsonbAttribute);
    objectPath.set(attrValue, path, value, false);
    this.set(Model.jsonbAttribute, attrValue);
    this.changed(Model.jsonbAttribute, true);
  };

  Model.prototype.updateJsonCounter = function(path) {
    this.setJsonValue(path, (Number(this.getJsonValue(path)) || 0) + 1);
  };
};
