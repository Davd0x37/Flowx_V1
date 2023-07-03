import { RuntimeAppError } from 'app/helpers/error';
import { internalGuard, isSupported } from 'app/helpers/internal-guards';
import { describe, expect, it } from 'vitest';

const exampleObject = {
  key: 'value',
};

describe('Test internal guards', () => {
  it('should return boolean if functionality is supported', () => {
    const supported = isSupported('key', exampleObject);

    expect(supported).toBeTruthy();
  });

  it('should return runtime global handler if functionality is supported', async () => {
    expect.assertions(3);

    try {
      const wnd = internalGuard('console');

      expect(wnd).not.toBeNull();
      expect(wnd).not.toBeUndefined();
      expect(wnd).toHaveProperty('console');
    } catch (error) {
      expect(error).toBeInstanceOf(RuntimeAppError);
    }
  });

  it('should throw error if functionality is not supported', async () => {
    expect.assertions(1);

    try {
      const wnd = internalGuard('testFun');

      expect(wnd).not.toBeNull();
      expect(wnd).not.toBeUndefined();
    } catch (error) {
      expect(error).toBeInstanceOf(RuntimeAppError);
    }
  });
});

export {};
