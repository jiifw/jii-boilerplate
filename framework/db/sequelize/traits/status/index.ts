// types
import { StatusTraitConfig, TraitType } from './types';
import { retrieve } from '@framework/base/config';
import merge from 'deepmerge';
import { configKey } from '@framework/db/sequelize';

// public types
export type { StatusTrait, StatusTraitStatic, StatusTraitConfig } from './types';

export default <TraitType>function(Model) {
  const config = <StatusTraitConfig>merge({
   column: 'status',
  }, retrieve(configKey, 'traits.status', {}));

  const registry = new Map<any, string>();

  Object.keys(Model)
    .filter(name => /^STATUS(_[A-Z][A-Z0-9]+)+$/.test(name))
    .forEach(current => {
      const _val = Model[current];
      const value = /^\d+$/.test(_val) ? Number(_val) : _val;
      const label = current.replace(/^STATUS_/, '')
        .replace('_', '_')
        .toLowerCase().trim();
      registry.set(value, label);
    });

  Model.prototype.toStatusLabel = function() {
    return Model.getStatusLabel(this.get(config.column));
  };

  Model.statusLabel = type => registry.get(type);

  Model.statusLabels = () => {
    return Object.fromEntries(registry.entries());
  };
};
