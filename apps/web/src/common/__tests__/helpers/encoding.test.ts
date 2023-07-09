import { describe, expect, it } from 'vitest';

import * as encoding from 'app/common/encoding';

const exampleText = 'text_to_encode';

describe('Test encoding helpers', () => {
  it('should convert string to array buffer', () => {
    const ABString = encoding.stringToArrayBuffer(exampleText);

    expect(ABString).toBeInstanceOf(Uint8Array);
    expect(ABString).not.toBeTypeOf('string');
  });

  it('should convert array buffer to string', () => {
    const ABString = encoding.stringToArrayBuffer(exampleText);
    const ABtoString = encoding.arrayBufferToString(ABString);

    expect(ABString).toBeInstanceOf(Uint8Array);
    expect(ABtoString).toBeTypeOf('string');
    expect(ABtoString).toMatch(exampleText);
  });

  it('encode array buffer to base64url', () => {
    const ABString = encoding.stringToArrayBuffer(exampleText);
    const encoded = encoding.base64UrlEncodeAB(ABString);

    expect(encoded).not.toBeInstanceOf(Uint8Array);
    expect(encoded).toBeTypeOf('string');
  });

  it('encode string to base64url', () => {
    const encoded = encoding.base64UrlEncode(exampleText);

    expect(encoded).not.toBeInstanceOf(Uint8Array);
    expect(encoded).toBeTypeOf('string');
  });
});

export {};
