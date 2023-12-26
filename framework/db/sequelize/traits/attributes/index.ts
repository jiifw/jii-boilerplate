// types
import { TraitType } from './types';

// public types
export type { AttributesTrait, AttributesTraitStatic } from './types';

export default <TraitType>function(Model) {
  const rawAttributes = Model.getAttributes();

  Model.attributeHints = () => {
    return Object.entries(rawAttributes)
      .reduce((accum, [key]) => {
        accum[key] = '';
        return accum;
      }, {});
  };

  Model.attributesName = (except = []) => {
    const attributes = Object.keys(rawAttributes);
    return except.length
      ? attributes.filter(n => !except.includes(n))
      : attributes;
  };

  Model.attributeLabels = () => {
    return Object.entries(rawAttributes)
      .reduce((accum, [key, value]) => {
        accum[key] = value.comment;
        return accum;
      }, {});
  };

  Model.prototype.attributesValue = function(names = [], except = []) {
    return Object.keys(Model.attributesName(except))
      .filter(name => (
        !except.length ? true : except.includes(name)
      ))
      .reduce((accum, name) => {
        accum[name] = this.get(name);
        return accum;
      }, {});
  };
};
