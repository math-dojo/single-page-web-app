import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  newUserSignupForm: FormGroup = new FormGroup({
    name: new FormControl('Some coolname'),
    email: new FormControl('youandi@com'),
    password: new FormControl('supersecret')
  });

  constructor(private authentiationService: AuthenticationService) {

   }

  ngOnInit() {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.newUserSignupForm.value);
    this.signupNewUser(this.newUserSignupForm.value);
  }


  private signupNewUser(newUser) {
    this.authentiationService.signupNewUser(newUser);
  }
}
