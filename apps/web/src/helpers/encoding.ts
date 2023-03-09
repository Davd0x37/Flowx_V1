export const toHex = (buffer: Uint8Array): string =>
  buffer.reduce((mem, val) => mem + `00${val.toString(16)}`.slice(-2), '');

export const base64urlencode = (input: ArrayBuffer): string =>
  btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

/**
 * Return string input as ArrayBuffer
 *
 * @param {string} str String to encode
 * @return {*}  {ArrayBuffer} Encoded string
 */
export const stringToArrayBuffer = (str: string): ArrayBuffer => new TextEncoder().encode(str);

/**
 * Decode ArrayBuffer as string
 *
 * @param {ArrayBuffer} ab
 * @return {*}  {string} Decoded array
 */
export const arrayBufferToString = (ab: ArrayBuffer, encoding = 'utf-8'): string =>
  new TextDecoder(encoding).decode(ab);
