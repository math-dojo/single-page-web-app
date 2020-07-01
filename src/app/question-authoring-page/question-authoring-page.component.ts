import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl,  Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { QuestionDto } from '../models/question-dto';
import { ResolvedStaticSymbol } from '@angular/compiler';


@Component({
  selector: 'app-question-authoring-page',
  templateUrl: './question-authoring-page.component.html',
  styleUrls: ['./question-authoring-page.component.scss']
})
export class QuestionAuthoringPageComponent implements OnInit {
  validateHints = false;
  submitted = false;
  validateOptions = false;
  newQuestionForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    body: new FormControl('', Validators.required),
    sampleAnswer: new FormControl(''),
    hints: new FormControl('', Validators.required),
    difficulty: new FormControl('', Validators.required),
    parentTopicTitle: new FormControl('', Validators.required),
    options: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required)
  });

  constructor() { }

  ngOnInit(): void {

  }

  onSubmit() {

    const question = new QuestionDto({
      title: this.newQuestionForm.controls.title.value,
      questionBody: this.newQuestionForm.controls.body.value,
      sampleAnswer: this.newQuestionForm.controls.sampleAnswer.value,
      hints: this.newQuestionForm.controls.hints.value.split(';'),
      answer: this.newQuestionForm.controls.answer.value,
      successRate: 0,
      difficulty: this.newQuestionForm.controls.difficulty.value,
      parentTopicTitle: this.newQuestionForm.controls.parentTopicTitle.value,
      questionAnswerOptions: this.newQuestionForm.controls.options.value.split(';'),
      solved : false
    });
    this.validateHints = this.customSplitValidator(3, question.hints);
    this.validateOptions = this.customSplitValidator(4, question.questionAnswerOptions);
    this.submitted = true;
    console.log(question.title);
  // add backend validation after call to question service
  // connect to azure queue store
  // add web security
  }
   customSplitValidator( maxLength: number, parts: string[]) {
      return (parts.length > 2 && (parts.length <= maxLength));
  }

}
