import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.scss']
})
export class TopicPageComponent implements OnInit {

  public readonly questions = [
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
  constructor() { }

  ngOnInit() {
  }

}
