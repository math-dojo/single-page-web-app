import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {

  question$: Observable<Question>;
  body : string;

  exampleForm = new FormGroup({
    sample: new FormControl('', Validators.required),
  });

  questionToDisplay: Question;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService
  ) {

  }

  ngOnInit() {
    const questionDto$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.questionService.getQuestionWithTitle(params.get('question')))
    );
    this.question$ = questionDto$.pipe(
      map(questionDto => Question.fromQuestionDto(questionDto))
    );
     this.question$.subscribe(question => this.body = question.questionBody);
  }

  submit() {

  }

  resetForm() {

  }

}
