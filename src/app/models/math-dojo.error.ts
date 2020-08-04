/**
 * Error thrown by the MathDojo UI. Represents an unrecoverable error
 * that will be logged into the browser's console.
 */
export class MathDojoError extends Error {
  constructor(message: string) {
    super(message);
  }
}
