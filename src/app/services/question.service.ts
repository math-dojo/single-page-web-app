import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor() { }

  getQuestionWithName(questionName: string): Observable<Question> {
    return of(new Question({
      title: questionName,
      body: 'lorem Ipsum',
      sampleAnswer: 'some sample answer',
      hints: ['try this first', 'if this doesn\'t help, tough'],
      solved: false,
      successRate: 0.4,
      difficulty: 'simple'
    }));
  }
}
