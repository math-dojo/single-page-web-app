import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { TopicDto } from '../models/topic-dto';
import { QuestionDto } from '../models/question-dto';
import { Difficulty } from '../models/question_difficulty';
import { QuestionServiceError } from './question-service.error';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  private readonly preStashedTopics = [
    new TopicDto({
      title: 'pure-mathematics',
      body: 'I am  bit hard',
      userProgress: 0.3
    }),
    new TopicDto({
      title: 'geometry',
      body: 'I am  bit hard',
      userProgress: 0.5
    }),
    new TopicDto({
      title: 'statistics',
      body: 'I am  bit hard',
      userProgress: 0.9
    }),
    new TopicDto({
      title: 'pure-mathematics',
      body: 'I am  bit hard',
      userProgress: 0.3
    }),
    new TopicDto({
      title: 'geometry',
      body: 'I am  bit hard',
      userProgress: 0.5
    }),
    new TopicDto({
      title: 'statistics',
      body: 'I am  bit hard',
      userProgress: 0.9
    })
  ];

  private readonly preStashedQuestions = [
    new QuestionDto({
      title: 'try-me-first',
      questionBody: 'When $a \\ne 0$, the solution of $$(ax^2 + bx + c = 0)$$ is $$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$',
      sampleAnswer: '42',
      successRate: 0.42,
      difficulty: Difficulty.Easy,
      answer: 'false',
      hints: ['try this', 'watch space odyssey'],
      parentTopicTitle: 'something-hard',
      questionAnswerOptions: ['choose me', 'me too', 'que no se te olvide que estoy'],
      solved: false
    }),
    new QuestionDto({
      title: 'other-thing-to-try',
      questionBody: '$\\sum_{i=1}^nx_i$',
      sampleAnswer: '42',
      successRate: 0.817563,
      difficulty: Difficulty.Easy,
      answer: 'false',
      hints: ['try this', 'watch space odyssey'],
      parentTopicTitle: 'something-hard',
      questionAnswerOptions: ['choose me', 'me too', 'que no se te olvide que estoy'],
      solved: false
    }),
    new QuestionDto({
      title: 'final-on-the-list',
      questionBody: 'something quite complex',
      sampleAnswer: '42',
      successRate: 0.2,
      difficulty: Difficulty.Easy,
      answer: 'false',
      hints: ['try this', 'watch space odyssey'],
      parentTopicTitle: 'something-hard',
      questionAnswerOptions: ['choose me', 'me too', 'que no se te olvide que estoy'],
      solved: false
    })
  ];

  getQuestionsForTopic(topicTitle: string): Observable<QuestionDto[]> {
    if (environment.name === 'default') {
      return this.http.get<QuestionDto[]>(`${
        environment.apis.questionServiceConsumerEndpoint
        }/topics/${topicTitle}/questions`);
    }

    /* Return a prestashed response when deployed
     * until the question service api is ready
    */
    return of(this.preStashedQuestions);
  }

  getTopics(): Observable<TopicDto[]> {
    if (environment.name === 'default') {
      return this.http.get<TopicDto[]>(`${
        environment.apis.questionServiceConsumerEndpoint
        }/topics`);
    }

    /* Return a prestashed response when deployed
     * until the question service api is ready
    */
    return of(this.preStashedTopics);
  }

  getTopicWithTitle(topicTitle: string): Observable<TopicDto> {
    if (environment.name === 'default') {
      return this.http.get<TopicDto>(`${
        environment.apis.questionServiceConsumerEndpoint
        }/topics/${topicTitle}`);
    }
    /* Return a prestashed response when deployed
     * until the question service api is ready
    */
    return of(new TopicDto({
      title: topicTitle,
      body: 'I am  bit hard',
      userProgress: Math.random()
    }));
  }

  getQuestionWithTitle(questionTitle: string): Observable<QuestionDto | null> {
    if (environment.name === 'default') {
      return this.http.get<QuestionDto>(`${
        environment.apis.questionServiceConsumerEndpoint
        }/questions/${questionTitle}`)
        .pipe(
          catchError((err: HttpErrorResponse, caught) => {
            if (err.status === 404) {
              return of(null);
            }
            throw new QuestionServiceError(`${err.error}`);
          })
        );
    }
    /* Return a prestashed response when deployed
     * until the question service api is ready
    */
    const [preExistingQuestion] = this.preStashedQuestions.filter(question => questionTitle === question.title);
    if (preExistingQuestion) {
      return of(preExistingQuestion);
    } else {
      return of(null);
    }

  }


  postQuestionToQuarantine(questionToPost: QuestionDto): Observable<string> {
    if (environment.name === 'default') {
      return this.http.post<string>(`${
        environment.apis.questionQuarantineConsumerEndpoint
        }/question`, questionToPost)
        .pipe(
          catchError((err: HttpErrorResponse, caught) => {
            throw new QuestionServiceError(`${err.error}`);
          })
        );
    }

    /* Return a prestashed response when deployed
     * until the question service api is ready
    */
    return of('');
  }


  searchForQuestionBy(
    { title, difficulty }: { title?: string; difficulty?: Difficulty }
    ): Observable<{questions: QuestionDto[]}> {
    let httpParams = new HttpParams();

    if (!title && !difficulty) {
      throw new Error('at least 1 argument must be specified when searching for a question');
    } else {
      if (title) {
        httpParams = httpParams.set('title', title);
      }

      if (difficulty) {
        httpParams = httpParams.set('difficulty', difficulty);
      }
    }

    if (environment.name === 'default') {
      return this.http.get<{questions: QuestionDto[]}>(`${
        environment.apis.questionQuarantineConsumerEndpoint
        }/questions`, {
          params: httpParams
        })
        .pipe(
          catchError((err: HttpErrorResponse, caught) => {
            throw new QuestionServiceError(`${err.error}`);
          })
        );
    } else {
      /*
      * Return a prestashed response when deployed
      * until the question service api is ready
      */
      if (/try/.test(title) || /final/.test(title)){
        return of({questions: this.preStashedQuestions});
      } else {
        return of({questions: []});
      }
    }
  }
}
