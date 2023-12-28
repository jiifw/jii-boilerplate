import { Command as CommandNative, CommandOptions } from 'commander';

export namespace cli {
  export interface CommandOption {
    /** Option name (e.g., 'e') */
    flag: `-${string}, --${string}` | `--${string}`;

    /** Argument that commend accepts */
    argument?: string;

    /** A short description regarding your command option */
    description: string;

    /** Optional argument default value. */
    default?: string | boolean | string[];

    /** Show choices to related to the option */
    choices?: string[];

    /** Make option mandatory */
    required?: boolean;
  }

  interface Interface<T extends string> {
    (flags: string, description: string, fn: (value: string, previous: T) => T, defaultValue?: T);

    (name: string, description?: string, defaultValue?: unknown);
  }

  export interface Argument {
    name: string;
    description?: string;
    defaultValue?: unknown;
  }

  export interface Command {
    /**
     * Name of the namespace.
     */
    name?: string;

    /** Aliases to the command */
    aliases?: Array<string>;

    /** Argument that commend accepts */
    argument?: Argument;

    /**
     * A short description regarding your command
     */
    description: string;

    /**
     * The flags string contains the short and/or long flags, separated by comma,
     * a pipe or space. A required option-argument is indicated by <> and an
     * optional option-argument by [].
     *
     * @example
     * [..., {command: 'p'}] // minimal
     */
    options?: Array<CommandOption>;

    /**
     * Initialize the command.
     */
    init?(command?: CommandNative, program?: CommandNative): Promise<void>;

    /**
     * Command processing logic handler
     */
    action(name?: string, options?: Record<string, any>, command?: CommandNative): Promise<void>;
  }
}
