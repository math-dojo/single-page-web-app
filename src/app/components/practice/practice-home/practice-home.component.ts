import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Topic } from 'src/app/models/topic';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-practice-home',
  templateUrl: './practice-home.component.html',
  styleUrls: ['./practice-home.component.scss'],
})
export class PracticeHomeComponent implements OnInit {
  topics$: Observable<Topic[]>;

  constructor(private questionService: QuestionService) {}

  ngOnInit() {
    const topicDtos$ = this.questionService.getTopics();

    this.topics$ = topicDtos$.pipe(
      map((topics) =>
        topics.map((eachTopicDto) => Topic.fromTopicDto(eachTopicDto))
      )
    );
  }
}
