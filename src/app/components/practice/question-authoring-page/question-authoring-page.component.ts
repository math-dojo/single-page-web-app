import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

import { QuestionService } from 'src/app/services/question.service';
import { QuestionDto } from 'src/app/models/question-dto';
import { map, catchError, first } from 'rxjs/operators';
import { Topic } from 'src/app/models/topic';
import { Difficulty } from 'src/app/models/question_difficulty';
import { QuestionTitleValidator } from './question-title.validator';
import { Observable, of } from 'rxjs';
import { MathDojoError } from 'src/app/models/math-dojo.error';
import { QuestionAuthoringGuard } from './question-authoring.guard';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-question-authoring-page',
  templateUrl: './question-authoring-page.component.html',
  styleUrls: ['./question-authoring-page.component.scss'],
})
export class QuestionAuthoringPageComponent implements OnInit {
  private readonly maxQuestionTitleLength = 64;
  public readonly bodyPlaceholder = `You can write text, that contains expressions like this: $x ^ 2 + 5$ inside them. As you probably know.
  You also can write expressions in display mode as follows: $$\\sum_{i=1}^n(x_i^2 - \\overline{x}^2)$$.
  In first case you will need to use \\$expression\\$ and in the second one \\$\\$expression\\$\\$.
  To escape the \\$ symbol it's mandatory to write as follows: \\\\$`;
  public readonly optionPlaceholder = 'x^2';
  public readonly difficulty: Difficulty[] = Object.keys(Difficulty).map(
    (each) => each as Difficulty
  );

  // tslint:disable-next-line: variable-name
  private _userAllowedAccess$: Observable<boolean>;
  successfulFormSubmission$: Observable<{ status: boolean } | undefined>;
  newQuestionForm: FormGroup;
  topics$: Observable<Topic[]>;
  requestAccessBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;

  constructor(
    private questionService: QuestionService,
    private questionTitleValidator: QuestionTitleValidator,
    private questionAuthoringGuard: QuestionAuthoringGuard
  ) {}

  ngOnInit(): void {
    this.newQuestionForm = new FormGroup({
      title: new FormControl('', {
        validators: [
          Validators.required,
          Validators.maxLength(this.maxQuestionTitleLength),
        ],
        updateOn: 'blur',
        asyncValidators: [
          this.questionTitleValidator.validate.bind(
            this.questionTitleValidator
          ),
        ],
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
      answer: new FormControl('', Validators.required),
    });
    this.successfulFormSubmission$ = of(undefined);

    const topicDtos$ = this.questionService.getTopics();

    this.topics$ = topicDtos$.pipe(
      map((topics) =>
        topics.map((eachTopicDto) => Topic.fromTopicDto(eachTopicDto))
      )
    );

    this._userAllowedAccess$ = this.questionAuthoringGuard.doesUserHavePermissions();
  }

  onSubmit() {
    /**
     * Angular seems to rerun async validaton when the submit event is fired .
     * Therefore explicitly calling the only control known to have an
     * async validator.
     */
    if (this.newQuestionForm.pending) {
      this.newQuestionForm.statusChanges
        .pipe(first())
        .subscribe((observedStatus) => {
          if (observedStatus === 'VALID') {
            const question = this.createQuestionDtoFromForm(
              this.newQuestionForm
            );
            this.successfulFormSubmission$ = this.quarantineQuestionAndResetForm(
              {
                questionService: this.questionService,
                questionDto: question,
                formToReset: this.newQuestionForm,
              }
            );
          } else if (observedStatus === 'INVALID') {
            throw new MathDojoError(
              'the form cannot be submitted when it is invalid'
            );
          }
        });
    } else {
      if (this.newQuestionForm.invalid) {
        throw new MathDojoError(
          'the form cannot be submitted when it is invalid'
        );
      } else {
        const question = this.createQuestionDtoFromForm(this.newQuestionForm);
        this.successfulFormSubmission$ = this.quarantineQuestionAndResetForm({
          questionService: this.questionService,
          questionDto: question,
          formToReset: this.newQuestionForm,
        });
      }
    }
  }

  private createQuestionDtoFromForm(formGroup: FormGroup): QuestionDto {
    return new QuestionDto({
      title: formGroup.controls.title.value,
      questionBody: formGroup.controls.body.value,
      sampleAnswer: formGroup.controls.sampleAnswer.value,
      hints: [
        formGroup.controls.hint1.value,
        formGroup.controls.hint2.value,
        formGroup.controls.hint3.value,
      ],
      answer: formGroup.controls.answer.value,
      successRate: 0,
      difficulty: formGroup.controls.difficulty.value,
      parentTopicTitle: formGroup.controls.parentTopicTitle.value,
      questionAnswerOptions: [
        formGroup.controls.option1.value,
        formGroup.controls.option2.value,
        formGroup.controls.option3.value,
        formGroup.controls.option4.value,
      ],
    });
  }

  resetAlertStatus() {
    this.successfulFormSubmission$ = of(undefined);
  }

  /**
   * Posts a question to the quarantine and resets the form if this is successful.
   * Returns an observable indicating whether the post was successful or not.
   */
  private quarantineQuestionAndResetForm({
    questionService,
    questionDto,
    formToReset,
  }: {
    questionService: QuestionService;
    questionDto: QuestionDto;
    formToReset: FormGroup;
  }): Observable<{ status: boolean }> {
    return questionService.postQuestionToQuarantine(questionDto).pipe(
      map((response) => {
        console.log(
          `successful response, ${JSON.stringify(
            response
          )}, from posting question to quarantine`
        );
        formToReset.reset();
        return { status: true };
      }),
      catchError((error) => {
        console.log(
          `unsuccessful response, ${JSON.stringify(
            error
          )}, from posting question to quarantine`
        );
        return of({ status: false });
      })
    );
  }

  public get userAllowedAccess$(): Observable<boolean> {
    return this._userAllowedAccess$;
  }

  requestAccess() {
    this.requestAccessBtnState = ClrLoadingState.LOADING;
    // TODO: Request access logic
    setTimeout(() => this.requestAccessBtnState = ClrLoadingState.SUCCESS, 1000);

  }
}
