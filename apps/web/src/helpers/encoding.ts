export const toHex = (buffer: Uint8Array): string =>
  buffer.reduce((mem, val) => mem + `00${val.toString(16)}`.slice(-2), '');

export const base64urlencode = (input: ArrayBuffer): string =>
  btoa(String.fromCharCode.apply(null, new Uint8Array(input) as any))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
// Buffer.from(input).toString('base64url');

/**
 * Return string input as ArrayBuffer
 *
 * @param {string} str String to encode
 * @return {*}  {ArrayBuffer} Encoded string
 */
export const str2ab = (str: string): ArrayBuffer => {
  const encoder = new TextEncoder();

  return encoder.encode(str);
};

/**
 * Decode ArrayBuffer as string
 *
 * @param {ArrayBuffer} ab
 * @return {*}  {string} Decoded array
 */
export const ab2str = (ab: ArrayBuffer, encoding = 'utf-8'): string => new TextDecoder(encoding).decode(ab);
