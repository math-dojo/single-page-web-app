import { GenericErrorType } from 'src/testing/generic-error.type';

export class AssertionTools {
  static checkErrorThrown<T>(expectedErrorType: GenericErrorType<T>, regexMatchForMessage: RegExp) {
    return (error: Error) => {
      expect(error instanceof expectedErrorType).toBe(
        true, `The provided error did not match the expected type ${expectedErrorType.name}`);
      expect(error.message).toMatch(regexMatchForMessage, `the error message: "${error.message}" did not match the expected format`);
    };
  }
}
