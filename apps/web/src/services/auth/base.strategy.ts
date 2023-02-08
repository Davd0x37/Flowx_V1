import { AuthParameters } from '@/types/auth';

/**
 * Base class for different authenticaiton strategies
 *
 * @export
 * @abstract
 * @class AuthBaseStrategy
 */
export abstract class AuthBaseStrategy {
  // private credentials!: Record<string, unknown>;

  // abstract authenticate(parameters: Record<string, unknown>): unknown;

  /**
   * Sets credentials for further use in strategy
   *
   * @abstract
   * @param {Partial<AuthParameters>} credentials
   * @memberof AuthBaseStrategy
   */
  abstract setCredentials(credentials: Partial<AuthParameters>): void;

  /**
   * Depending on the strategy, it will prepare tokens, URLs, etc.,
   * and will return appropriate parameters for user authentication
   *
   * @abstract
   * @param {Record<string, unknown>} parameters
   * @return {*}  {unknown}
   * @memberof AuthBaseStrategy
   */
  abstract setupAuthentication(parameters: Record<string, unknown>): unknown;

  /**
   * Sends request with credentials in exchange for tokens
   *
   * @abstract
   * @param {Record<string, unknown>} parameters
   * @return {*}  {unknown}
   * @memberof AuthBaseStrategy
   */
  abstract requestTokens(parameters: Record<string, unknown>): unknown;

  // abstract requestData(parameters: Record<string, unknown>): T;
}
