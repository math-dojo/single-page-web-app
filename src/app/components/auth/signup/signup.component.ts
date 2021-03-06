import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  newUserSignupForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authentiationService: AuthenticationService) {

   }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.newUserSignupForm.value);
    // this.signupNewUser(this.newUserSignupForm.value);
  }


  private signupNewUser(newUser) {
    this.authentiationService.signupNewUser(newUser);
  }
}
