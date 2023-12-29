import merge from 'deepmerge';

interface RequestErrorOptions {
  code: string;
  state: Record<string, string>;
  statusCode: number;
}

/**
 * Create a request error with additional metadata
 */
export default class RequestError extends Error {
  protected code: string;
  protected statusCode: number;
  protected state: Record<string, any>;

  /**
   * Class constructor
   */
  constructor(message: string = 'The request is invalid.', code = 'BAD_REQUEST', options: Partial<RequestErrorOptions> = {}) {
    options = merge({
      statusCode: 400,
      state: {},
    }, options);
    super(message);

    this.code = code;
    this.statusCode = options.statusCode;
    this.state = options.state;
  }

  /**
   * Get error code
   * e.g., 'BAD_REQUEST'
   */
  getCode(): string {
    return this.code;
  }

  /**
   * Get error metadata
   * e.g., {...}
   */
  getState(): Record<string, any> {
    return this.state;
  }

  /**
   * Get http status code
   * e.g., 400
   */
  getStatusCode(): number {
    return this.statusCode;
  }
}
