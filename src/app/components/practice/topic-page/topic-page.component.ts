import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { Observable } from 'rxjs';
import { Topic } from 'src/app/models/topic';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.scss']
})
export class TopicPageComponent implements OnInit {

  topic$: Observable<Topic>
  questions$: Observable<Question[]>;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) { }

  ngOnInit() {
    this.topic$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.questionService.getTopicWithTitle(params.get('topic')))
    )

    this.questions$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.questionService.getQuestionsForTopic(params.get('topic')))
    )

  }

}
