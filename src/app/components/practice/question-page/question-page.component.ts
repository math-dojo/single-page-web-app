import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {

  question$: Observable<Question>

  exampleForm = new FormGroup({
    sample: new FormControl('', Validators.required),
  });

  questionToDisplay: Question;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionService: QuestionService
  ) {

  }

  ngOnInit() {
    this.question$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.questionService.getQuestionWithName(params.get('question')))
    );
  }

  submit() {

  }

  resetForm() {

  }

}
