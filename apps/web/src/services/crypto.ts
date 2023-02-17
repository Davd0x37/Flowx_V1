/**
 * 1. Import key from raw input (Uint - TextEncoder and encode string into array).
 *    Hash raw input using PBKDF2
 *    Converts Uint array to CryptoKey object.
 * 2. Derive key from CryptoKey object containing imported key.
 * From MozillaDeveloper
 * ```
 *    baseKey is a CryptoKey representing the input to the derivation algorithm.
 *    If algorithm is ECDH, then this will be the ECDH private key.
 *    Otherwise it will be the initial key material for the derivation function:
 *    for example, for PBKDF2 it might be a password, imported as
 *    a CryptoKey using SubtleCrypto.importKey().
 * ```
 * 3. Encrypt
 */
import { IV_LEN, debug, internalGuard } from '../helpers';
import { stringToArrayBuffer } from '../utils';
import { AppError } from '../utils/error';

export const generateRandomValue = (length: number): Uint8Array => {
  const { crypto } = internalGuard('crypto');
  let bufferArray = new Uint8Array(length);

  // https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues#exceptions
  if (bufferArray.byteLength > 65536) {
    bufferArray = new Uint8Array(65536);
  }

  return crypto.getRandomValues(bufferArray);
};

/**
 * Get CryptoKey from password string
 *
 * @param {string} key MasterPassword
 * @return {Promise<CryptoKey>} Generated CryptoKey
 */
const importKey = async (key: string): Promise<CryptoKey> => {
  const {
    crypto: { subtle },
  } = internalGuard('crypto');

  const baseKey = stringToArrayBuffer(key);

  try {
    return subtle.importKey('raw', baseKey, 'PBKDF2', false, ['deriveKey']);
  } catch (error) {
    debug(error);

    throw new AppError({
      name: 'IMPORT_KEY_FAILED',
      message: `Couldn't import key, check password`,
      cause: error,
    });
  }
};

/**
 * Get secret key from master key
 *
 * @param {CryptoKey} key CryptoKey obtained from importKey function
 * @param {Uint8Array} salt
 * @return {Promise<CryptoKey>}
 */
const deriveKey = async (key: CryptoKey, salt: Uint8Array): Promise<CryptoKey> => {
  const {
    crypto: { subtle },
  } = internalGuard('crypto');

  try {
    return subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 10000,
        hash: {
          name: 'SHA-512',
        },
      },
      key,
      {
        name: 'AES-GCM',
        length: 256,
      },
      false,
      ['encrypt', 'decrypt']
    );
  } catch (error) {
    debug(error);

    throw new AppError({
      name: 'DERIVE_KEY_FAILED',
      message: `Couldn't derive key, check imported key`,
      cause: error,
    });
  }
};

/**
 * Encrypt content
 *
 * @export
 * @param {Uint8Array} content Everything can be passed, just convert it to Uint8Array
 * @param {string} password
 * @return {Promise<Uint8Array>} Encrypted content
 */
export async function encrypt(content: Uint8Array, password: string): Promise<Uint8Array> {
  const {
    crypto: { subtle },
  } = internalGuard('crypto');

  try {
    // Generate IV and salt
    const iv = generateRandomValue(IV_LEN);
    const salt = generateRandomValue(IV_LEN);

    // Get CryptoKey from password
    const importedKey = await importKey(password);

    // Generate secret key from imported key
    const derivedKey = await deriveKey(importedKey, salt);

    // Returns ArrayBuffer
    const arrayBuffer = await subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      derivedKey,
      content
    );

    // Convert arraybuffer to Uint8Array
    const encrypted = new Uint8Array(arrayBuffer);
    const abIVData = new Uint8Array(new ArrayBuffer(IV_LEN * 2 + encrypted.length));
    abIVData.set(iv);
    abIVData.set(salt, IV_LEN);
    abIVData.set(encrypted, IV_LEN * 2);

    return abIVData;
  } catch (error) {
    debug(error);

    const message = error instanceof AppError ? error.message : `Couldn't encrypt data`;

    throw new AppError({
      name: 'ENCRYPTION_ERROR',
      message,
      cause: error,
    });
  }
}

/**
 * Decrypt content using master password
 *
 * @export
 * @param {Uint8Array} encrypted Encrypted content, saved in Uint8Array
 * @param {string} password
 * @return {Promise<Uint8Array>} Decrypted content
 */
export async function decrypt(encrypted: Uint8Array, password: string): Promise<Uint8Array> {
  const {
    crypto: { subtle },
  } = internalGuard('crypto');

  const [iv, salt, data] = [
    encrypted.slice(0, IV_LEN),
    encrypted.slice(IV_LEN, IV_LEN * 2),
    encrypted.slice(IV_LEN * 2),
  ];

  try {
    const importedKey = await importKey(password);
    const derivedKey = await deriveKey(importedKey, salt);

    const arrayBuffer = await subtle.decrypt(
      {
        name: 'AES-GCM',
        iv,
      },
      derivedKey,
      data
    );

    const decrypted = new Uint8Array(arrayBuffer);

    return decrypted;
  } catch (error) {
    debug(error);

    const message = error instanceof AppError ? error.message : `Couldn't decrypt data`;

    throw new AppError({
      name: 'DECRYPTION_ERROR',
      message,
      cause: error,
    });
  }
}

/**
 * Hash input using (default) SHA-256
 *
 * @param {(string | ArrayBuffer)} input
 * @param {('SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512')} [algorithm='SHA-256']
 * @return {Promise<ArrayBuffer>}
 */
export async function hash(
  input: string | ArrayBuffer,
  algorithm: 'SHA-256' | 'SHA-384' | 'SHA-512' = 'SHA-256'
): Promise<ArrayBuffer> {
  const {
    crypto: { subtle },
  } = internalGuard('crypto');

  try {
    if (typeof input === 'string') {
      const arrayBuffer = stringToArrayBuffer(input);

      return subtle.digest(algorithm, arrayBuffer);
    }

    return subtle.digest(algorithm, input);
  } catch (error) {
    debug(error);

    throw new AppError({
      name: 'HASHING_ERROR',
      message: `Couldn't hash input`,
      cause: error,
    });
  }
}

// export const Argon2 = {
//   /**
//    * Hash input and return
//    *
//    * @export
//    * @param {string} input
//    * @param {string} [saltNew]
//    * @return {Promise<[string, string]>} [salt, encoded]
//    */
//   async hash(input: string, saltNew?: string): Promise<[string, string]> {
//     try {
//       const salt = saltNew || Buffer.from(getRandomValues(IV_LEN)).toString('hex');

//       const { encoded } = await argon2browser.hash({
//         pass: input,
//         salt,
//         time: 3, // Number of iterations
//         mem: 14777, // In KiB
//         type: argon2browser.ArgonType.Argon2id,
//       });

//       return [salt, encoded];
//     } catch (error) {
//       // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//       debug('[HASH]')(`Hashing error: ${error}`);

//       throw new Error(`[HASH] Hash error. Check debug log.`);
//     }
//   },

//   /**
//    * Compare input with encoded hash
//    *
//    * @export
//    * @param {string} input
//    * @param {(string | Uint8Array)} encoded
//    * @return {(Promise<boolean>)}
//    */
//   async verify(input: string, encoded: string | Uint8Array): Promise<boolean> {
//     try {
//       const req = await argon2browser.verify({
//         pass: input,
//         encoded,
//         type: argon2browser.ArgonType.Argon2id,
//       });

//       return !!req;
//     } catch (error) {
//       // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//       debug('[HASH]')(`Hash verifying error: ${error}`);

//       throw new Error(`[HASH] Verify error. Check debug log.`);
//     }
//   },
// };