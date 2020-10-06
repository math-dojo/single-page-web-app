import { Component, OnInit } from '@angular/core';
import { Topic } from '../../models/topic';
import { Observable } from 'rxjs';
import { QuestionService } from 'src/app/services/question.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

  topics$: Observable<Topic[]>;

  constructor(
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    const topicDtos$ = this.questionService.getTopics();

    this.topics$ = topicDtos$.pipe(
      map(topics => topics.map(
        eachTopicDto => Topic.fromTopicDto(eachTopicDto)
      )));
  }

}
