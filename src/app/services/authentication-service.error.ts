/**
 * Error thrown by the AuthenticationService {@link AuthenticationService} in the presence of any
 * unexpected errors during the authentication process.
 */
export class AuthenticationServiceError extends Error {
  constructor(message: string) {
    super(message);
  }
}
