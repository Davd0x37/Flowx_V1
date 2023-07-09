/**
 * DEPENDENCY INVERSION TYPES/INTERFACES
 */
export interface RequestClient {
  fetch: (input: RequestInfo | URL, options?: RequestInit) => Promise<Response>;
}

export interface CryptoClient {
  encrypt: (input: string | ArrayBuffer, key: string) => ArrayBuffer | Promise<ArrayBuffer>;
  decrypt: (input: string | ArrayBuffer, key: string) => ArrayBuffer | Promise<ArrayBuffer>;
  hash?: (key: unknown) => unknown;
  verify?: (key: unknown) => unknown;
}
