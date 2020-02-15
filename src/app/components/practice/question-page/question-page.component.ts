import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent implements OnInit {

  exampleForm = new FormGroup({
    sample: new FormControl('', Validators.required),
  });

  constructor() { }

  ngOnInit() {
  }

}
