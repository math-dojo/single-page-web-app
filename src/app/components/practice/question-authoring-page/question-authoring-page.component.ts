import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import { QuestionService } from 'src/app/services/question.service';
import { QuestionDto } from 'src/app/models/question-dto';
import { map, catchError } from 'rxjs/operators';
import { Topic } from 'src/app/models/topic';
import { Difficulty } from 'src/app/models/question_difficulty';
import { QuestionTitleValidator } from './question-title.validator';
import { Observable, of } from 'rxjs';
import { TopicDto } from 'src/app/models/topic-dto';



@Component({
  selector: 'app-question-authoring-page',
  templateUrl: './question-authoring-page.component.html',
  styleUrls: ['./question-authoring-page.component.scss']
})
export class QuestionAuthoringPageComponent implements OnInit {
  private maxQuestionTitleLength = 64;
  successfulFormSubmission$: Observable<boolean | undefined> = new Observable(subscriber => {
    subscriber.next(undefined);
    subscriber.complete();
  });
  difficulty: Difficulty[] = Object.keys(Difficulty).map(each => each as Difficulty);
  newQuestionForm: FormGroup;
  topics$: Observable<TopicDto[]>;

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
  }

  ngOnInit(): void {
    const topicDtos$ = this.questionService.getTopics();

    this.topics$ = topicDtos$.pipe(
      map(topics => topics.map(
        eachTopicDto => Topic.fromTopicDto(eachTopicDto)
      )));
  }

  onSubmit() {
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
        map((response) => true),
        catchError((error) => {
          return of(false);
        })
      );
    /*
        this.validateOptions = this.customOptionsValidator(question.questionAnswerOptions);
        let notFound: boolean;
        this.questionService.getQuestionWithTitle(question.title).pipe(map(questions => notFound = questions.title === null));
        if (notFound === true) {
          this.questionExists = true;
        }
        if (this.validateOptions && !this.questionExists) {
          // connect to azure queue store here
          this.submitted = true;
        } */

    // add web security
  }

  /*   customOptionsValidator(options: string[]) {
      return !(options[0] !== '' && options[1] === '') && !(options[0] === '' &&
        (options[1] !== '' || options[2] !== '' || options[3] !== ''));
    } */

}
