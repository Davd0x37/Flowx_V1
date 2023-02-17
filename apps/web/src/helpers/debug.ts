import { BaseError } from '../utils/base-error';
import { AppError, RuntimeAppError } from '../utils/error';
import { isDevEnv } from './RootConfig';

const consoleStyles = {
  groupName: `font-size: 1.3em; background: #040507; color: #f44336; padding: 3px 10px;`,
  error: {
    name: `background: #040507; color: #f44336; padding: 3px 10px;`,
    message: `background: #365a68; color: #d8e9d3; padding: 3px 10px;`,
    stack: `background: #5ca6c4; color: #040507; padding: 3px 10px;`,
    cause: `background: #b78834; color: #040507; padding: 3px 10px;`,
  },
} as const;

interface DebugErrorParams {
  showTrace?: boolean;
}

interface DebugParams {
  name: string;
  message: string;
}

function printAdditionals(params: DebugParams) {
  console.group(`%c${params.name}`, consoleStyles.groupName);

  console.log(`%c[ERROR NAME]:\t ${params.name}`, consoleStyles.error.name);

  console.log(`%c[ERROR MESSAGE]:\t ${params.message}`, consoleStyles.error.message);

  console.groupEnd();
}

function printErrorInstance(error: unknown, params?: DebugErrorParams) {
  if (error instanceof BaseError || error instanceof AppError || error instanceof RuntimeAppError) {
    console.group(`%c${error.name}`, consoleStyles.groupName);

    if (params?.showTrace) {
      console.groupCollapsed(`%c[COLLAPSED STACK TRACE]`, consoleStyles.error.stack);
      console.trace();
      console.groupEnd();
    }

    console.log(`%c[ERROR NAME]:\t ${error.name}`, consoleStyles.error.name);
    console.log(`%c[ERROR MESSAGE]:\t ${error.message}`, consoleStyles.error.message);

    if (error?.stack) {
      console.log('%c[ERROR STACK]:\t', consoleStyles.error.stack, error.stack);
    }

    if (error?.cause) {
      console.log('%c[ERROR CAUSE]:\t', consoleStyles.error.cause, error.cause);
    }

    console.groupEnd();
  }
}

export function debug(params: DebugParams) {
  if (isDevEnv) {
    printAdditionals(params);
  }
}

export function debugErr(error: unknown, params?: DebugErrorParams) {
  if (isDevEnv) {
    printErrorInstance(error, params);
  }
}
