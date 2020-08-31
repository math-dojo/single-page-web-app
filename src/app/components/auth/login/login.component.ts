import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userLoginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authentiationService: AuthenticationService) {

   }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.userLoginForm.value);
    // this.signupNewUser(this.newUserSignupForm.value);
  }


  private signupNewUser(newUser) {
    this.authentiationService.signupNewUser(newUser);
  }

}
