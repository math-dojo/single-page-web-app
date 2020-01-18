import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  newUserSignupForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authentiationService: AuthenticationService) {

   }

  ngOnInit() {
    let self = this;
    let applicationId = "466743210695836"

    self.loadFBSDK(applicationId);
  }
  loadFBSDK(applicationId: string) {

    (<any>window).fbAsyncInit = () => {
      (<any>window).FB.init({
        appId            : applicationId,
        autoLogAppEvents : true,
        xfbml            : true,
        version          : 'v5.0'
      });
    };
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
