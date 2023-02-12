import { BaseError } from './base-error';

export type RUNTIME_ERRORS = 'RUNTIME_FUNCTION_NOT_AVAILABLE' | 'GLOBAL_HANDLER_NOT_AVAILABLE';
export class RuntimeAppError extends BaseError<RUNTIME_ERRORS> {}

export type CRYPTO_ERRORS =
  | 'ENCRYPTION_ERROR'
  | 'DECRYPTION_ERROR'
  | 'IMPORT_KEY_FAILED'
  | 'DERIVE_KEY_FAILED'
  | 'HASHING_ERROR';
// export class CryptoError extends BaseError<CRYPTO_ERRORS> {}

export type OAUTH_ERRORS =
  | 'REQUEST_FETCH_ERROR'
  | 'RESPONSE_ERROR'
  | 'REQUEST_ERROR'
  | 'CODE_NOT_FOUND'
  | 'STATE_NOT_FOUND'
  | 'STATE_MISMATCH'
  | 'CODE_CHALLENGE_FAILED';
// export class OAuthError extends BaseError<OAUTH_ERRORS> {}

export type APP_ERRORS = CRYPTO_ERRORS | OAUTH_ERRORS | 'FETCH_ERROR' | '';
export class AppError extends BaseError<APP_ERRORS> {}
