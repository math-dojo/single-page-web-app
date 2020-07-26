import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import { QuestionService } from 'src/app/services/question.service';
import { QuestionDto } from 'src/app/models/question-dto';
import { map, catchError, startWith, first } from 'rxjs/operators';
import { Topic } from 'src/app/models/topic';
import { Difficulty } from 'src/app/models/question_difficulty';
import { QuestionTitleValidator } from './question-title.validator';
import { Observable, of, Subject, throwError } from 'rxjs';
import { TopicDto } from 'src/app/models/topic-dto';
import { MathDojoError } from 'src/app/models/math-dojo.error';



@Component({
  selector: 'app-question-authoring-page',
  templateUrl: './question-authoring-page.component.html',
  styleUrls: ['./question-authoring-page.component.scss']
})
export class QuestionAuthoringPageComponent implements OnInit {
  private maxQuestionTitleLength = 64;
  successfulFormSubmission$: Observable<{status: boolean} | undefined>;
  difficulty: Difficulty[] = Object.keys(Difficulty).map(each => each as Difficulty);
  newQuestionForm: FormGroup;
  topics$: Observable<Topic[]>;

  constructor(private questionService: QuestionService, private questionTitleValidator: QuestionTitleValidator) {
    /* Angular calls the async validator from some context where "this" does not point to
     * the instance of the questionTitleValidator bound here. This needs to be done
     * explicitly.
     */
    const boundValidatorFunction: (ctrl: AbstractControl) => Observable<ValidationErrors> = this
      .questionTitleValidator.validate.bind(this.questionTitleValidator);
    this.newQuestionForm = new FormGroup({
      title: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(this.maxQuestionTitleLength)
        ],
        updateOn: 'blur',
        asyncValidators: [
          boundValidatorFunction
        ]
      }),
      body: new FormControl('', Validators.required),
      sampleAnswer: new FormControl(''),
      hint1: new FormControl(''),
      hint2: new FormControl(''),
      hint3: new FormControl(''),
      difficulty: new FormControl('', Validators.required),
      parentTopicTitle: new FormControl('', Validators.required),
      option1: new FormControl(''),
      option2: new FormControl(''),
      option3: new FormControl(''),
      option4: new FormControl(''),
      answer: new FormControl('', Validators.required)
    });
    this.successfulFormSubmission$ = of(undefined);
  }

  ngOnInit(): void {
    const topicDtos$ = this.questionService.getTopics();

    this.topics$ = topicDtos$.pipe(
      map(topics => topics.map(
        eachTopicDto => Topic.fromTopicDto(eachTopicDto)
      )));
  }

  onSubmit() {
    /**
     * Angular seems to rerun async validaton when the submit event is fired .
     * Therefore explicitly calling the only control known to have an
     * async validator.
     */
    if (this.newQuestionForm.pending) {
      this.newQuestionForm.statusChanges.pipe(
        first()
      ).subscribe((observedStatus) => {
        if (observedStatus === 'VALID') {
        const question = new QuestionDto({
          title: this.newQuestionForm.controls.title.value,
          questionBody: this.newQuestionForm.controls.body.value,
          sampleAnswer: this.newQuestionForm.controls.sampleAnswer.value,
          hints: [this.newQuestionForm.controls.hint1.value, this.newQuestionForm
            .controls.hint2.value, this.newQuestionForm.controls.hint3.value],
          answer: this.newQuestionForm.controls.answer.value,
          successRate: 0,
          difficulty: this.newQuestionForm.controls.difficulty.value,
          parentTopicTitle: this.newQuestionForm.controls.parentTopicTitle.value,
          questionAnswerOptions: [this.newQuestionForm.controls.option1.value,
          this.newQuestionForm.controls.option2.value,
          this.newQuestionForm.controls.option3.value,
          this.newQuestionForm.controls.option4.value]
        });
        this.successfulFormSubmission$ = this.questionService.postQuestionToQuarantine(question)
          .pipe(
            map((response) => {

              this.newQuestionForm.reset();
              return ({status: true});
            }),
            catchError((error) => {
              return of({status: false});
            })
          );
        } else if (observedStatus === 'INVALID') {
        throw new MathDojoError('the form cannot be submitted when it is invalid');
      }
      });
    } else {
      if (this.newQuestionForm.invalid) {
        throw new MathDojoError('the form cannot be submitted when it is invalid');
      }
    }

  }

}
