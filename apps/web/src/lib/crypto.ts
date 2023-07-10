// https://github.com/dchest/tweetnacl-js
import { CryptoClient } from 'app/types';

export const Crypto: CryptoClient = {
  encrypt: function (input: string | ArrayBuffer, key: string): ArrayBuffer | Promise<ArrayBuffer> {
    throw new Error('Function not implemented.');
    return input as ArrayBuffer;
  },
  decrypt: function (input: string | ArrayBuffer, key: string): ArrayBuffer | Promise<ArrayBuffer> {
    throw new Error('Function not implemented.');
    return input as ArrayBuffer;
  },
  hash: function (key: unknown): unknown {
    throw new Error('Function not implemented.');
  },
  verify: function (key: unknown): unknown {
    throw new Error('Function not implemented.');
  },
};
