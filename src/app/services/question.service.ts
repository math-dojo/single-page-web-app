import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Question } from '../models/question';
import { Topic } from '../models/topic';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  getQuestionsForTopic(topicTitle: string): Observable<Question[]> {
    return of(this.preStashedQuestions);
  }

  getTopics(): Observable<Topic[]> {
    return of(this.preStashedTopics);
  }

  getTopicWithTitle(topicTitle: string): Observable<Topic> {
    return of(new Topic({
      title: topicTitle,
      body: 'I am  bit hard',
      userProgress: Math.random()
    }));
  }

  getQuestionWithTitle(questionTitle: string): Observable<Question> {
    return of(new Question({
      title: questionTitle,
      body: 'Lorem Ipsum. I am a lovely wall of text and I have contained within a very hard question. What is the meaning of life?',
      sampleAnswer: 'some sample answer',
      hints: ['try this first', 'if this doesn\'t help, tough'],
      solved: false,
      successRate: 0.4,
      difficulty: 'simple',
      parentTopicTitle: 'something-hard',
      questionAnswerOptions: ['choose me', 'me too', 'que no se te olvide que estoy']
    }));
  }

  private readonly preStashedTopics: Topic[] = [
    new Topic({
      title: 'pure-mathematics',
      body: 'I am  bit hard',
      userProgress: 0.3
    }),
    new Topic({
      title: 'geometry',
      body: 'I am  bit hard',
      userProgress: 0.5
    }),
    new Topic({
      title: 'statistics',
      body: 'I am  bit hard',
      userProgress: 0.9
    }),
    new Topic({
      title: 'pure-mathematics',
      body: 'I am  bit hard',
      userProgress: 0.3
    }),
    new Topic({
      title: 'geometry',
      body: 'I am  bit hard',
      userProgress: 0.5
    }),
    new Topic({
      title: 'statistics',
      body: 'I am  bit hard',
      userProgress: 0.9
    })
  ];

  private readonly preStashedQuestions = [
    new Question({
      title: 'try-me-first',
      body: 'something quite complex',
      sampleAnswer: '42',
      successRate: 0.42,
      difficulty: 'easy',
      solved: false,
      hints: ['try this', 'watch space odyssey'],
      parentTopicTitle: 'something-hard',
      questionAnswerOptions: ['choose me', 'me too', 'que no se te olvide que estoy']
    }),
    new Question({
      title: 'other-thing-to-try',
      body: 'something quite complex',
      sampleAnswer: '42',
      successRate: 0.817563,
      difficulty: 'easy',
      solved: false,
      hints: ['try this', 'watch space odyssey'],
      parentTopicTitle: 'something-hard',
      questionAnswerOptions: ['choose me', 'me too', 'que no se te olvide que estoy']
    }),
    new Question({
      title: 'final-on-the-list',
      body: 'something quite complex',
      sampleAnswer: '42',
      successRate: 0.2,
      difficulty: 'easy',
      solved: false,
      hints: ['try this', 'watch space odyssey'],
      parentTopicTitle: 'something-hard',
      questionAnswerOptions: ['choose me', 'me too', 'que no se te olvide que estoy']
    })
  ];
}
