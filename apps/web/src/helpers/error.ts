export interface ErrorParameters<T> {
  name: T;
  message: string;
  cause?: unknown;
}

export class BaseError<T extends string> extends Error {
  public name: T;
  public message: string;
  public cause?: unknown;

  constructor({ name, message, cause }: ErrorParameters<T>) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}

export type RUNTIME_ERRORS = 'RUNTIME_FUNCTION_NOT_AVAILABLE' | 'GLOBAL_HANDLER_NOT_AVAILABLE';
export class RuntimeAppError extends BaseError<RUNTIME_ERRORS> {}

export type CRYPTO_ERRORS =
  | 'ENCRYPTION_ERROR'
  | 'DECRYPTION_ERROR'
  | 'IMPORT_KEY_FAILED'
  | 'DERIVE_KEY_FAILED'
  | 'HASHING_ERROR';
// export class CryptoError extends BaseError<CRYPTO_ERRORS> {}

export type FACTORY_ERRORS = 'FACTORY_NOT_FOUND';

export type AUTH_ERRORS =
  | 'REQUEST_FETCH_ERROR'
  | 'RESPONSE_ERROR'
  | 'REQUEST_ERROR'
  | 'CODE_NOT_FOUND'
  | 'STATE_NOT_FOUND'
  | 'STATE_MISMATCH'
  | 'ENDPOINT_NOT_FOUND'
  | 'DISCOVERY_CONFIGURATION_ERROR'
  | 'DISCOVERY_CONTENT_TYPE_ERROR'
  | 'ENDPOINT_CONFIGURATION_ERROR'
  | 'BASIC_AUTH_CONFIGURATION_ERROR'
  | 'TOKEN_REQUEST_ERROR'
  | 'TOKEN_REQUEST_CREDENTIALS_ERROR'
  | 'TOKEN_REQUEST_UNKNOWN_ERROR'
  | 'CODE_CHALLENGE_FAILED';
// export class OAuthError extends BaseError<AUTH_ERRORS> {}

export type APP_ERRORS = FACTORY_ERRORS | CRYPTO_ERRORS | AUTH_ERRORS | 'FETCH_ERROR' | '';
export class AppError extends BaseError<APP_ERRORS> {}
