import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Question } from '../models/question';
import { Topic } from '../models/topic';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  getTopicWithTitle(topicTitle: string): Observable<Topic> {
    return of(new Topic({
      title: topicTitle,
      body: 'I am  bit hard',
      userProgress: Math.random()
    }));
  }

  constructor() { }

  getQuestionWithName(questionName: string): Observable<Question> {
    return of(new Question({
      title: questionName,
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
}
