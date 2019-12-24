import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  newUserSignupForm: FormGroup = new FormGroup({
    name: new FormControl('Some coolname'),
    email: new FormControl('youandi@com'),
    password: new FormControl('supersecret')
  });

  constructor() {

   }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.newUserSignupForm.value);
  }

}
