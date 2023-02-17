export const isDevEnv = true;

export const isBrowser = typeof window !== 'undefined';
// export const isNode = typeof process === 'object';

export const defaultWindow = isBrowser ? window : undefined;
export const defaultDocument = isBrowser ? window.document : undefined;
export const defaultLocation = isBrowser ? window.location : undefined;
export const defaultNavigator = isBrowser ? window.navigator : undefined;

export const defaultGlobal =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof self !== 'undefined'
    ? self
    : typeof window !== 'undefined'
    ? window
    : // : typeof global !== 'undefined'
      // ? global
      undefined;
