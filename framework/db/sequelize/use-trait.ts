import { existsSync } from 'node:fs';

// utils
import { normalize, resolve } from '@framework/utils/path';

// types
import { sequelize } from './types';
import { getValue } from '@framework/env';
import { getAlias } from '@framework/base/aliases';

/**
 * @public
 * @static
 * Bind traits with Sequelize model
 *
 * @example
 * use(User, [
 *   `#framework://attributes`,
 *   `#framework://json`,
 *   `#app://customer-config`,
 * ]);
 *
 * @param {sequelize.Model} model - Sequelize ORM model
 * @param {Array<string>} traits - Traits list in the following format
 * be removed. Trailing '/' and '\' characters will be trimmed. This can be
 *
 * - Core trait: `#framework://{trait}` *(a trait directory under `@framework/db/sequelize/traits`)*
 * - App trait: `#app://{trait}` *(a trait directory under `@app/sequelize/traits`)*
 */
export default function use<T>(model: T, traits: Array<sequelize.TraitPath> = []): void {
  // Skip
  if (!traits.length) {
    return;
  }

  const jiiRoot = normalize(getAlias('@framework/db/sequelize'));
  const appRoot = normalize(getValue<string>('SEQUELIZE_DIR', ''));

  for (const name of traits) {
    if (!/^#(framework|app):\/\//.test(name)) {
      throw new Error(`Invalid trait format '${name}' given`);
    }

    const path = name
      .replace('#framework://', `${jiiRoot}/traits/`)
      .replace('#app://', `${appRoot}/traits/`);

    const filePath = resolve(path);

    if (!existsSync(filePath)) {
     throw new Error(`Trait file '${name}' => '${filePath}' does not exist`);
    }

    const {default: invoker} = require(filePath);
    invoker(model);
  }
}
