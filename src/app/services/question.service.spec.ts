import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QuestionService } from './question.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { QuestionDto } from '../models/question-dto';
import { environment } from 'src/environments/environment';
import { QuestionServiceError } from './question-service.error';
import { AssertionTools } from '../../testing/assertion-tools';

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

  describe('.getQuestionWithTitle()', () => {

    it('should return a question dto if one with a matching title can be found', waitForAsync(() => {
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
    }));

    it('should return null if question could not be found, i.e. error was 404 ', waitForAsync(() => {
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
    }));

    it('should throw a QuestionServiceError if the service returns codes between 400 and 503, excluding 404', waitForAsync(() => {
      // Given
      const questionNameToSearchFor = 'test-question';
      const expectedQuestionDto = new QuestionDto({ title: questionNameToSearchFor, parentTopicTitle: 'nonsense' });
      const errorStatusText = 'some error message';
      const errorReasonFromServer = `the specified question ${questionNameToSearchFor} could not be found`;
      const statusCode = generateRandomHTTPErrorCodeExcluding([404]);

      // When
      const questionSearchObservable = questionService.getQuestionWithTitle(questionNameToSearchFor);

      // Then
      questionSearchObservable.subscribe({
        next: () => fail('an error should have been thrown'),
        error: AssertionTools.checkErrorThrown(QuestionServiceError, new RegExp(errorReasonFromServer))
      });

      const req = httpTestingController.expectOne(`${
        environment.apis.questionServiceConsumerEndpoint}/questions/${questionNameToSearchFor
        }`);
      expect(req.request.method).toEqual('GET');
      req.flush(errorReasonFromServer, {
        status: statusCode,
        statusText: errorStatusText
      });
    }));
  });

  describe('.postQuestionToQuarantine()', () => {

    it('should return an observable of null if the question is submitted successfully', waitForAsync(() => {
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
    }));

    it('should throw a QuestionServiceError if the question is not submitted', waitForAsync(() => {
      // Given
      const questionToSubmit = new QuestionDto({ title: 'some-title', parentTopicTitle: 'nonsense' });
      const errorStatusText = 'some generic error message';
      const errorReasonFromServer = `the question with title ${questionToSubmit.title} could not be submitted`;
      const statusCode = generateRandomHTTPErrorCodeExcluding([404]);

      // When
      const questionSearchObservable = questionService.postQuestionToQuarantine(questionToSubmit);

      // Then
      questionSearchObservable.subscribe({
        next: () => fail('an error should have been thrown'),
        error: AssertionTools.checkErrorThrown(QuestionServiceError, new RegExp(errorReasonFromServer))
      });

      const req = httpTestingController.expectOne((foundRequest) => {
        const regexOfExpectedUrl = new RegExp(`${
          environment.apis.questionQuarantineConsumerEndpoint}/question`);
        return ((foundRequest.method === 'POST') && regexOfExpectedUrl.test(foundRequest.url));
      });
      expect(req.request.method).toEqual('POST');
      req.flush(errorReasonFromServer, {
        status: statusCode,
        statusText: errorStatusText
      });
    }));
  });

  describe('.searchForQuestionBy()', () => {

    it('should return an array of matching question dtos if one with a matching title can be found', waitForAsync(() => {
      // Given
      const questionNameToSearchFor = 'test-question';
      const expectedSearchResults = [new QuestionDto({ title: questionNameToSearchFor, parentTopicTitle: 'nonsense' })];

      // When
      const questionSearchObservable = questionService.searchForQuestionBy({title: questionNameToSearchFor});

      // Then
      questionSearchObservable.subscribe({
        next: returnedQuestionDtos => expect((returnedQuestionDtos[0].title)).toEqual(questionNameToSearchFor),
        error: fail
      });

      const req = httpTestingController.expectOne(request => (
        request.url === `${
          environment.apis.questionServiceConsumerEndpoint}/questions`
        && request.params.has('title')
      ), 'query parameters containing \'title\' and url to /question');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedSearchResults);
    }));

    it('should return an empty array if one with a matching title cannot be found', waitForAsync(() => {
      // Given
      const questionNameToSearchFor = 'test-question';
      const expectedSearchResults = [];

      // When
      const questionSearchObservable = questionService.searchForQuestionBy({title: questionNameToSearchFor});

      // Then
      questionSearchObservable.subscribe({
        next: returnedQuestionDtos => expect((returnedQuestionDtos.length)).toEqual(0),
        error: fail
      });

      const req = httpTestingController.expectOne(request => (
        request.url === `${
          environment.apis.questionServiceConsumerEndpoint}/questions`
        && request.params.has('title')
      ), 'query parameters containing \'title\' and url to /question');
      expect(req.request.method).toEqual('GET');
      req.flush(expectedSearchResults);
    }));

    it('should throw a QuestionServiceError if the service returns codes between 400 and 503', waitForAsync(() => {
      // Given
      const questionNameToSearchFor = 'test-question';
      const errorStatusText = 'some error message';
      const errorReasonFromServer = `the specified question ${questionNameToSearchFor} could not be found`;
      const statusCode = generateRandomHTTPErrorCodeExcluding();

      // When
      const questionSearchObservable = questionService.searchForQuestionBy({title: questionNameToSearchFor});

      // Then
      questionSearchObservable.subscribe({
        next: () => fail('an error should have been thrown'),
        error: AssertionTools.checkErrorThrown(QuestionServiceError, new RegExp(errorReasonFromServer))
      });

      const req = httpTestingController.expectOne(request => (
        request.url === `${
          environment.apis.questionServiceConsumerEndpoint}/questions`
        && request.params.has('title')
      ), 'query parameters containing \'title\' and url to /question');
      expect(req.request.method).toEqual('GET');
      req.flush(errorReasonFromServer, {
        status: statusCode,
        statusText: errorStatusText
      });
    }));
  });
  afterEach(() => {
    httpTestingController.verify();

    TestBed.resetTestingModule();
  });

  function generateRandomHTTPErrorCodeExcluding(codesToExclude: number[] = []) {
    const setOfCodesToExclude = new Set(codesToExclude);
    const statusCodeChoices = [...Array((503 - 400) + 1).keys()]
      .map(each => each + 400)
      .filter(each => !(setOfCodesToExclude).has(each));
    const statusCode = statusCodeChoices[Math.floor(Math.random() * statusCodeChoices.length)];

    return statusCode;
  }
});
