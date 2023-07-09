export const toHex = (buffer: Uint8Array): string =>
  buffer.reduce((mem, val) => mem + `00${val.toString(16)}`.slice(-2), '');

export const base64UrlEncode = (input: string): string =>
  btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

export const base64UrlEncodeAB = (input: ArrayBuffer): string =>
  base64UrlEncode(String.fromCharCode(...new Uint8Array(input)));

/**
 * Return string input as Uint8Array
 *
 * @param {string} str String to encode
 * @return {Uint8Array} Encoded string
 */
export const stringToArrayBuffer = (str: string): Uint8Array => new TextEncoder().encode(str);

/**
 * Decode ArrayBuffer as string
 *
 * @param {BufferSource} ab
 * @return {string} Decoded array
 */
export const arrayBufferToString = (ab: BufferSource, encoding = 'utf-8'): string =>
  new TextDecoder(encoding).decode(ab);
