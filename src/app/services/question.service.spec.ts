import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QuestionService } from './question.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { QuestionDto } from '../models/question-dto';
import { environment } from 'src/environments/environment';

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

  afterEach(() => {
    httpTestingController.verify();

    TestBed.resetTestingModule();
  });
});
