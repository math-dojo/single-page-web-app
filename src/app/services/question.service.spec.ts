import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QuestionService } from './question.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { QuestionDto } from '../models/question-dto';
import { environment } from 'src/environments/environment';
import { QuestionServiceError } from './question-service.error';
import { GenericErrorType } from '../utilities/generic-error.type';

describe('QuestionService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let questionService: QuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    questionService = TestBed.inject(QuestionService);
  });

  it('should be created', () => {
    const service: QuestionService = TestBed.inject(QuestionService);
    expect(service).toBeTruthy();
  });

  describe('Given I call .getQuestionWithTitle, it: ', () => {

    it('should return a question dto if one with a matching title can be found', () => {
      // Given
      const questionNameToSearchFor = 'test-question';
      const expectedQuestionDto = new QuestionDto({ title: questionNameToSearchFor, parentTopicTitle: 'nonsense' });

      // When
      const questionSearchObservable = questionService.getQuestionWithTitle(questionNameToSearchFor);

      // Then
      questionSearchObservable.subscribe({
        next: returnedQuestionDto => expect(returnedQuestionDto.title).toEqual(questionNameToSearchFor),
        error: fail
      });

      const req = httpTestingController.expectOne(`${
        environment.apis.questionServiceConsumerEndpoint}/questions/${questionNameToSearchFor
        }`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedQuestionDto);
    });

    it('should return null if question could not be found, i.e. error was 404 ', () => {
      // Given
      const questionNameToSearchFor = 'test-question';
      const expectedQuestionDto = new QuestionDto({ title: questionNameToSearchFor, parentTopicTitle: 'nonsense' });

      // When
      const questionSearchObservable = questionService.getQuestionWithTitle(questionNameToSearchFor);

      // Then
      questionSearchObservable.subscribe({
        next: response => expect(response).toBeNull('the returned object is not null'),
        error: fail
      });

      const req = httpTestingController.expectOne(`${
        environment.apis.questionServiceConsumerEndpoint}/questions/${questionNameToSearchFor
        }`);
      expect(req.request.method).toEqual('GET');
      req.flush(`the specified question ${questionNameToSearchFor} could not be found`, {
        status: 404,
        statusText: 'not found'
      });
    });

    it('should throw a QuestionServiceError if the service returns codes between 400 and 503, excluding 404', () => {
      // Given
      const questionNameToSearchFor = 'test-question';
      const expectedQuestionDto = new QuestionDto({ title: questionNameToSearchFor, parentTopicTitle: 'nonsense' });
      const errorStatusText = 'some error message';
      const codesToExclude = new Set([404]);
      const statusCodeChoices = [...Array((503 - 400) + 1).keys()].map(each => each + 400).filter(each => !(codesToExclude).has(each));
      const statusCode = statusCodeChoices[Math.floor(Math.random() * statusCodeChoices.length)];

      const checkErrorThrown = <T>(expectedErrorType: GenericErrorType<T>, regexMatchForMessage: RegExp) => {
        return (error: Error) => {
          expect(error instanceof expectedErrorType).toBe(
            true, `The provided error did not match the expected type ${expectedErrorType.name}`);
          expect(error.message).toMatch(regexMatchForMessage, `the error message: ${error.message} did not match the expected format`);
        };
      };

      // When
      const questionSearchObservable = questionService.getQuestionWithTitle(questionNameToSearchFor);

      // Then
      questionSearchObservable.subscribe({
        next: () => fail('an error should have been thrown'),
        error: checkErrorThrown(QuestionServiceError, new RegExp(errorStatusText))
      });

      const req = httpTestingController.expectOne(`${
        environment.apis.questionServiceConsumerEndpoint}/questions/${questionNameToSearchFor
        }`);
      expect(req.request.method).toEqual('GET');
      req.flush(`the specified question ${questionNameToSearchFor} could not be found`, {
        status: statusCode,
        statusText: errorStatusText
      });
    });
  });

  describe('Given I call .postQuestionToQuarantine, it: ', () => {

    it('should return an observable of null if the question is submitted successfully', () => {
      // Given
      const questionToSubmit = new QuestionDto({ title: 'some-title', parentTopicTitle: 'nonsense' });
      const expectedResponseText = 'Successful submission';

      // When
      const questionSearchObservable = questionService.postQuestionToQuarantine(questionToSubmit);

      // Then
      questionSearchObservable.subscribe({
        next: responseText => expect(responseText).toMatch(expectedResponseText),
        error: fail
      });

      const req = httpTestingController.expectOne((foundRequest) => {
        const regexOfExpectedUrl = new RegExp(`${
          environment.apis.questionQuarantineConsumerEndpoint}/question`);
        return ((foundRequest.method === 'POST') && regexOfExpectedUrl.test(foundRequest.url));
      });
      expect(req.request.method).toEqual('POST');
      req.flush(expectedResponseText, {
        status: 201,
        statusText: 'Success'
      });
    });
  });

  afterEach(() => {
    httpTestingController.verify();

    TestBed.resetTestingModule();
  });
});
