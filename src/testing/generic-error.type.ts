/**
 * A generic error type used for performing assertions on types
 * of errors thrown from services. Assert errors by comparing the
 * call signature of the error's prototype.
 */
export type GenericErrorType<T> = new (message?: string) => T;
