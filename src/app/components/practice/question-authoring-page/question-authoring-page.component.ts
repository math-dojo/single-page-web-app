import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { QuestionService } from 'src/app/services/question.service';
import { QuestionDto } from 'src/app/models/question-dto';
import { map } from 'rxjs/operators';
import { Topic } from 'src/app/models/topic';



@Component({
  selector: 'app-question-authoring-page',
  templateUrl: './question-authoring-page.component.html',
  styleUrls: ['./question-authoring-page.component.scss']
})
export class QuestionAuthoringPageComponent implements OnInit {
  submitted = false;
  questionExists = false;
  difficulty: string[] = ['Easy', 'Medium', 'Hard'];
  validateOptions = true;
  disabled = false;
  newQuestionForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
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
  topics$: any;

  constructor(private questionService: QuestionService) {

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
        .controls.hint1.value, this.newQuestionForm.controls.hint3.value],
      answer: this.newQuestionForm.controls.answer.value,
      successRate: 0,
      difficulty: this.newQuestionForm.controls.difficulty.value,
      parentTopicTitle: this.newQuestionForm.controls.parentTopicTitle.value,
      questionAnswerOptions: [this.newQuestionForm.controls.option1.value,
      this.newQuestionForm.controls.option2.value,
      this.newQuestionForm.controls.option3.value,
      this.newQuestionForm.controls.option4.value],
      solved: false
    });

    this.validateOptions = this.customOptionsValidator(question.questionAnswerOptions);
    let notFound: boolean;
    this.questionService.getQuestionWithTitle(question.title).pipe(map(questions => notFound = questions.title === null));
    if (notFound === true) {
      this.questionExists = true;
    }
    if (this.validateOptions && !this.questionExists) {
      // connect to azure queue store here
      this.submitted = true;
    }

    // add web security
  }
  customOptionsValidator(options: string[]) {
    return !(options[0] !== '' && options[1] === '') && !(options[0] === '' &&
      (options[1] !== '' || options[2] !== '' || options[3] !== ''));
  }

}
