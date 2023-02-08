import { defaultGlobal } from './RootConfig';

/**
 * Checks if global container provides required functionality
 *
 * @param fun Runtime-provided API name eg. IntersectionObserver
 * @param container global container name eg. window, self, globalThis, global
 */
export const isSupported = <T extends object>(fun: string, container: T): boolean => {
  return fun in container;
};

/**
 *
 *
 * @template T
 * @param {T} expr Expression to check
 * @param {string} [msg] Exception message
 * @return {NonNullable<T>} {asserts} Return unwrapped value if not thrown
 */
export function assert<T>(expr: T, msg?: string): asserts expr is NonNullable<T> {
  if (!expr) throw new Error(msg);
}

/**
 * Returns global container (window, self, global etc.) if requested functionality is available
 *
 * @throws Throws error if global container is not available
 * @return Window | globalThis | self | global
 */
export const defaultGlobalExist = (): NonNullable<typeof defaultGlobal> => {
  const defaultGlobalRef = defaultGlobal;

  assert(defaultGlobalRef, 'Global / Window is not available!');

  return defaultGlobalRef;
};

/**
 * Returns global container (window, self, global etc.) if requested functionality is available
 *
 * @param {string} fun Requested functionality
 * @throws Throws error if functionality not available
 * @return Window | globalThis | self | global
 */
export const internalGuard = (fun: string): NonNullable<typeof defaultGlobal> => {
  const defaultGlobalRef = defaultGlobalExist();

  assert(isSupported(fun, defaultGlobalRef), `Required "${fun}" is not available in current runtime!`);

  return defaultGlobalRef;
};
