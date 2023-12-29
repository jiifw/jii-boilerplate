/**
 * Generate for 'plugin' schematic
 */

import { input, confirm } from '@inquirer/prompts';

// utils
import { getAlias } from '@framework/base/aliases';
import { toString } from '@framework/utils/string';
import { isPath, createDir } from '@framework/utils/path';
import { kebab, classname } from '@framework/utils/inflector';
import { renderWriteFile } from '@framework/utils/nunjucks';

// views path
const TEMPLATES_PATH: string = `${__dirname}/templates`;

// server plugins config alias path
const APP_CONFIG_SERVER_ALIAS: string = `@app/server/config`;

/**
 * Collecting inputs from developer by interactive cli
 */
const collectInputs = async () => {
  //<editor-fold desc="plugin id">
  const id = await input({
    message: 'Unique ID (e.g., "authorization" or "access-token")',
    transformer: kebab,
    validate(value) {
      if (!toString(value, true)) {
        return 'Plugin ID should be provided';
      }

      return true;
    },
  });
  //</editor-fold>

  //<editor-fold desc="Directory alias">
  const directory = await input({
    message: 'Directory to generate?',
    default: '@app/plugins',
    async validate(value) {
      if (!value.startsWith('@')) {
        return 'Path should start with @alias';
      }

      if (!/^@\w+(\/\w+)+$/.test(value)) {
        return 'Path should have alias along with directory name (e.g., @alias/directory)';
      }

      let _path = getAlias(value);

      if (!isPath(_path, 'dir')) {
        return `Path to the directory should exist: ${_path}`;
      }

      return true;
    },
  });
  //</editor-fold>

  //<editor-fold desc="Overwrite existing files?">
  let overwrite = true;
  if (isPath(getAlias(`${directory}/${id}`), 'dir')) {
    overwrite = await confirm({
      message: `Plugin directory '${directory}/${id}' already exist. Confirm overwrite files (index.ts, types.ts)?`,
      default: false,
    });
  }
  //</editor-fold>

  //<editor-fold desc="Generate config file">
  const generateConfig = await confirm({
    message: `Generate configuration file to '@app/server/config'?`,
    default: false,
  });
  //</editor-fold>

  return {
    id,
    directory,
    overwrite,
    generateConfig,
  };
};

/**
 * File system operations handler
 */
const writeFiles = async (inputs, variables = {}) => {
  const dirPath: string = getAlias(inputs.directory + '/' + inputs.id);

  // create plugin directory
  if (!createDir(dirPath)) {
    throw new Error (`Failed to create '${dirPath}' directory, check proper access to the parent directory`);
  }

  const options = {
    variables,
    overwrite: inputs.overwrite,
    print: true,
  };

  renderWriteFile(
    `${TEMPLATES_PATH}/plugin.njk`,
    `${dirPath}/index.ts`,
    options,
  );

  renderWriteFile(
    `${TEMPLATES_PATH}/types.njk`,
    `${dirPath}/types.ts`,
    options,
  );

  if ( inputs.generateConfig ) {
    renderWriteFile(
      `${TEMPLATES_PATH}/config.njk`,
      `${APP_CONFIG_SERVER_ALIAS}/${inputs.id}.plugin.ts`,
      options,
    );
  }
};

/**
 * Generator builder
 */
export default async function() {
  const inputs = await collectInputs();

  const variables: Record<string, any> = {
    plugin: {
      id: inputs.id,
      class: classname(inputs.id),
      namespace: `${inputs.directory}/${inputs.id}`,
    },
  };

  writeFiles(inputs, variables);
}
