import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { TopicDto } from '../models/topic-dto';
import { QuestionDto } from '../models/question-dto';

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
      difficulty: 'easy',
      answer: 'false',
      hints: ['try this', 'watch space odyssey'],
      parentTopicTitle: 'something-hard',
      questionAnswerOptions: ['choose me', 'me too', 'que no se te olvide que estoy'],
      solved : false
    }),
    new QuestionDto({
      title: 'other-thing-to-try',
      questionBody: '$\\sum_{i=1}^nx_i$',
      sampleAnswer: '42',
      successRate: 0.817563,
      difficulty: 'easy',
      answer: 'false',
      hints: ['try this', 'watch space odyssey'],
      parentTopicTitle: 'something-hard',
      questionAnswerOptions: ['choose me', 'me too', 'que no se te olvide que estoy'],
      solved : false
    }),
    new QuestionDto({
      title: 'final-on-the-list',
      questionBody: 'something quite complex',
      sampleAnswer: '42',
      successRate: 0.2,
      difficulty: 'easy',
      answer: 'false',
      hints: ['try this', 'watch space odyssey'],
      parentTopicTitle: 'something-hard',
      questionAnswerOptions: ['choose me', 'me too', 'que no se te olvide que estoy'],
      solved : false
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

  getQuestionWithTitle(questionTitle: string): Observable<QuestionDto> {
    if (environment.name === 'default') {
      return this.http.get<QuestionDto>(`${
        environment.apis.questionServiceConsumerEndpoint
      }/questions/${questionTitle}`);
    }
    /* Return a prestashed response when deployed
     * until the question service api is ready
    */
    return of(new QuestionDto({
      title: questionTitle,
      questionBody: 'Lorem Ipsum. I am a lovely wall of text',
      sampleAnswer: 'some sample answer',
      hints: ['try this first', 'if this doesn\'t help, tough'],
      answer: 'false',
      successRate: 0.4,
      difficulty: 'simple',
      parentTopicTitle: 'something-hard',
      questionAnswerOptions: ['choose me', 'me too', 'que no se te olvide que estoy'],
      solved : false
    }));
  }
}
