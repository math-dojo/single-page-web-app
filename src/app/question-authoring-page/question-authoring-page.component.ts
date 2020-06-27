import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl,  Validators } from '@angular/forms';
import { QuestionDto } from '../models/question-dto';


@Component({
  selector: 'app-question-authoring-page',
  templateUrl: './question-authoring-page.component.html',
  styleUrls: ['./question-authoring-page.component.scss']
})
export class QuestionAuthoringPageComponent implements OnInit {


  newQuestionForm: FormGroup = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
    sampleAnswer: new FormControl(''),
    hints: new FormControl(''),
    difficulty: new FormControl(''),
    parentTopicTitle: new FormControl(''),
    options: new FormControl(''),
    answer: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {
   
  }
 
  onSubmit(){
    //remember to split options and hints and create new object
    const question = <QuestionDto> this.newQuestionForm.value;
    
    //do something with created question
    //question already exists valdation
  }

}
