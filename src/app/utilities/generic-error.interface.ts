/**
 * A generic error interface used for performing assertions on types
 * of errors thrown from services.
 */
export type GenericErrorInterface<T> = new (message?: string) => T;
