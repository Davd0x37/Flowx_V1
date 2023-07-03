import { wait } from 'app/helpers/async';
import { describe, expect, it } from 'vitest';

const TIME = 1000;

describe('Test async helpers', () => {
  it(
    'should wait',
    async () => {
      expect.assertions(2);

      const res = 150;

      expect(res).toBe(150);

      await wait(TIME);

      expect(res).toBe(150);
    },
    { timeout: TIME + 1000 }
  );
});

export {};
