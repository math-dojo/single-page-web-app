/**
 * Error thrown by the QuestionService {@link QuestionService} in the presence of any
 * unexpected errors from the call to the QuestionService backend.
 */
export class QuestionServiceError extends Error {
  constructor(message: string) {
    super(message);
  }
}
