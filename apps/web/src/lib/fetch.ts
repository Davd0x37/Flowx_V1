import { internalGuard } from '@/helpers';
import { FetchClient } from '@/types';

export const Fetch: FetchClient = {
  async fetch(input: RequestInfo | URL, options?: RequestInit): Promise<Response> {
    const wnd = internalGuard('fetch');

    try {
      return wnd.fetch(input, options);
    } catch (error) {
      throw new Error(`Error occured during fetch: ${error}`);
    }
  },
};
