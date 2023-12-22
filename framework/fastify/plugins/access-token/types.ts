export type TokenOption = {
  [key: string]: any;
  name: string;
}

export type TokenHeaderOption = {
  [key: string]: any;
  header: string;
}

export type TokenBearerOption = {
  [key: string]: any;
  scheme: string;
}

export type TokenAllOption = TokenOption
  & TokenHeaderOption
  & TokenBearerOption & { [key: string]: any; }

export interface AccessTokenRequestDecorator {
  /**
   * Retrieve a JWT token from a URL query param
   * @param [options] - Additional options
   */
  query(options?: TokenOption): string | null;

  /**
   * Retrieve a JWT token from a FormBody object
   * @param [options] - Additional options
   */
  formBody(options?: TokenOption): string | null;

  /**
   * Retrieve a JWT token from a request body
   * @param [options] - Additional options
   */
  body(options?: TokenOption): string | null;

  /**
   * Retrieve a JWT token from an Auth bearer header
   * @param [options] - Additional options
   */
  authBearer(options?: TokenBearerOption): string | null;

  /**
   * Retrieve a JWT token from a header
   * @param [options] - Additional options
   */
  header(options?: TokenHeaderOption): string | null;

  /**
   * Retrieve a JWT token from all sources
   * @see retrieveFromQuery
   * @see retrieveFromBody
   * @see retrieveFromFormBody
   * @see retrieveFromAuthBearer
   * @see retrieveFromHeader
   * @param [options] - Additional options
   */
  retrieve(options?: TokenAllOption): string | null;
}
