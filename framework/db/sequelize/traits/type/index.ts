// types
import { TraitType, TypeTraitConfig } from './types';
import merge from 'deepmerge';
import { retrieve } from '@framework/base/config';
import { configKey } from '@framework/db/sequelize';

// public types
export type { TypeTrait, TypeTraitStatic, TypeTraitConfig } from './types';

export default <TraitType>function(Model) {
  const config = <TypeTraitConfig>merge({
    column: 'type',
  }, retrieve(configKey, 'traits.type', {}));

  const registry = new Map<any, string>();

  Object.keys(Model)
    .filter(name => /^TYPE(_[A-Z][A-Z0-9]+)+$/.test(name))
    .forEach(current => {
      const value = Model[current];
      const label = current.replace(/^TYPE_/, '')
        .replace('_', '_')
        .toLowerCase().trim();
      registry.set(value, label);
    });

  Model.prototype.toTypeLabel = function() {
    return Model.getStatusLabel(this.get(config.column));
  };

  Model.typeLabel = type => registry.get(type);

  Model.typeLabels = () => {
    return Object.fromEntries(registry.entries());
  };
};

