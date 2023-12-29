// utils
import { resolve } from '@framework/utils/path';
import { isClass } from '@framework/utils/reflection';

// types
import { ServerInstance } from '@framework/typings/server';
import { Class as ClassStatic } from 'utility-types';

interface IJii {
  app?: ServerInstance;
}

type Logger = ServerInstance['log'];

export default class Jii implements IJii {
  protected container: Map<string, any>;
  protected logger: Logger;

  /**
   * A constructor for the Jii class.
   */
  constructor(public readonly app: ServerInstance) {
    this.container = new Map<string, any>();
    this.logger = app.log;
  }

  /**
   * Sets the logger object.
   * @param logger the logger object.
   */
  setLogger(logger: Logger) {
    this.logger = logger;
  }

  /**
   * @return Logger message logger
   */
  getLogger() {
    return this.logger;
  }

  /**
   * Logs an error message.
   * An error message is typically logged when an unrecoverable error occurs
   * during the execution of an application.
   */
  error(msg: string, ...args: any[]) {
    this.logger.error(msg, ...args);
  }

  /**
   * Logs a debug message.
   * Trace messages are logged mainly for development purposes to see
   * the execution workflow of some code. This method will only log
   * a message when the application is in debug mode.
   */
  debug(msg: string, ...args: any[]) {
    this.logger.debug(msg, ...args);
  }

  /**
   * Logs a warning message.
   * A warning message is typically logged when an error occurs while the execution
   * can still continue.
   */
  warning(msg: string, ...args: any[]) {
    this.logger.warn(msg, ...args);
  }

  /**
   * Alias of {@link debug}.
   */
  trace(msg: string, ...args: any[]) {
    this.logger.trace(msg, ...args);
  }

  /**
   * Logs an informative message.
   * An informative message is typically logged by an application to keep record of
   * something important (e.g. an administrator logs in).
   */
  info(msg: string, ...args: any[]) {
    this.logger.info(msg, ...args);
  }

  /**
   * Creates a new object using the given configuration.
   *
   * @param classname The class name to create. Must start with @alias. e.g., @alias/path/to/class
   * @param [params] A configuration array of constructor parameters.
   *
   * @example
   *
   * // create an object with two constructor parameters
   * const object = Jii.createObject('@app/classes/MyClass', [param1, param2]);
   */

  createObject<T extends object>(classname: string, params: any[] = []): InstanceType<ClassStatic<T>> {
    if (!classname.startsWith('@')) {
      throw new Error('Classname must start with @alias. e.g., @alias/path/to/class');
    }

    const Class = require(resolve(classname))?.default || null;

    if (!Class || !isClass(Class)) {
      throw new Error('File must have an actual class and should be exported as default');
    }

    return new Class(...params);
  }
};
