// utils
import { isObject } from '@framework/utils/object';
import { checkStringEmpty } from './commands';

// types
import { cli } from '@framework/cli/types';

export const validateCommandOption = async (option: cli.CommandOption): Promise<void> => {
  if (checkStringEmpty(option?.flag)) {
    throw new Error(`Option's 'flag' must not be empty`);
  }

  if (!/^(-[a-z], --[a-z]-?[a-z]+)|(--[a-z]-?[a-z]+)$/.test(option?.flag)) {
    throw new Error(`Option's 'flag' must follow the correct format: --flag or -f, --flag`);
  }

  if (checkStringEmpty(option?.description)) {
    throw new Error(`Option's 'description' must not be empty`);
  }

  if (!checkStringEmpty(option?.argument) && !/(\[[a-z][a-z-]+]|<[a-z][a-z-]+>)/.test(option?.argument)) {
    throw new Error(`Option's 'argument' should be one of them [[a-z][a-z-]+] or <[a-z][a-z-]+>`);
  }

  if (option?.choices && !Array.isArray(option?.choices)) {
    throw new Error(`Option's 'choices' should be an array of string`);
  }
};

export const validateCommand = async (instance: cli.Command) => {
  if (checkStringEmpty(instance?.description)) {
    throw new Error('Description should not be empty');
  }

  if ('function' !== typeof instance.action) {
    throw new Error(`Command's 'handler' should be a function instead of a ${typeof instance.action}`);
  }

  if (instance.aliases && !Array.isArray(instance.aliases)) {
    throw new Error(`'aliases' should be a an array instead of a ${typeof instance.aliases}`);
  }

  if (instance?.init && 'function' !== typeof instance.init) {
    throw new Error(`Command's 'init' should be a function instead of a ${typeof instance.init}`);
  }

  if (instance?.argument) {
    if (!isObject(instance?.argument)) {
      throw new Error(`Option's 'argument' must be an object`);
    }

    if (checkStringEmpty(instance?.argument?.name)) {
      throw new Error(`Option's 'argument.name' should not be empty`);
    }

    if (checkStringEmpty(instance?.argument?.description)) {
      throw new Error(`Option's 'argument.description' should not be empty`);
    }

    if (instance?.argument?.defaultValue && checkStringEmpty(instance?.argument?.defaultValue)) {
      throw new Error(`Option's 'argument.defaultValue' should be a string`);
    }
  }
}
