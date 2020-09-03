import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userLoginFormGroup: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private authentiationService: AuthenticationService) {

   }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.userLoginFormGroup.value);
    // this.signupNewUser(this.newUserSignupForm.value);
  }


  private signupNewUser(newUser) {
    this.authentiationService.signupNewUser(newUser);
  }

}
