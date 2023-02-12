export interface ErrorParameters<T> {
  name: T;
  message: string;
  cause?: unknown;
}

export class BaseError<T extends string> extends Error {
  public name: T;
  public message: string;
  public cause?: unknown;

  constructor({ name, message, cause }: ErrorParameters<T>) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}
