import { internalGuard } from '../helpers';

export const Fetch = async (url: string, options?: RequestInit): Promise<Response> => {
  const wnd = internalGuard('fetch');

  try {
    return wnd.fetch(url, options);
  } catch (error) {
    throw new Error(`Error occured during fetch: ${error}`);
  }
};
