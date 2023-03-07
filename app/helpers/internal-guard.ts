import { RUNTIME_ERRORS, RuntimeAppError } from '../utils/error';
import { defaultGlobal } from './root-config';

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
 * @param {RUNTIME_ERRORS} [name] Exception name
 * @param {string} [message] Exception message
 * @param {unknown} [cause] Detailed explanation of error
 * @return {NonNullable<T>} {asserts} Return unwrapped value if not thrown
 */
export function assert<T>(
  expr: T,
  name: RUNTIME_ERRORS,
  message: string,
  cause?: unknown
): asserts expr is NonNullable<T> {
  if (!expr)
    throw new RuntimeAppError({
      name,
      message,
      cause,
    });
}

/**
 * Returns global container (window, self, global etc.) if requested functionality is available
 *
 * @throws Throws error if global container is not available
 * @return Window | globalThis | self | global
 */
export const defaultGlobalExist = (): NonNullable<typeof defaultGlobal> => {
  const defaultGlobalRef = defaultGlobal;

  assert(defaultGlobalRef, 'GLOBAL_HANDLER_NOT_AVAILABLE', 'Global / Window not available!', {
    code: 'Requested "Global / Window" handler is not available in current runtime',
  });

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

  assert(isSupported(fun, defaultGlobalRef), 'RUNTIME_FUNCTION_NOT_AVAILABLE', `${fun} is not availbalbe`, {
    code: `Requested "${fun}" is not available in current runtime!`,
  });

  return defaultGlobalRef;
};
