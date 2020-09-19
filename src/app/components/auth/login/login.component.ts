import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private privateLoginFailed: boolean;
  userLoginFormGroup: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

  }

  onSubmit() {
    this.authenticationService.login(
      this.userLoginFormGroup.controls.username.value,
      this.userLoginFormGroup.controls.password.value
    ).pipe(first())
    .subscribe({
      next: user => user ? this.router.navigate(['/dashboard']) : throwError('the identified user was null'),
      error: err => {
        // TODO: #62 Replace with a call to the logging service.
        console.warn(`an error, "${err.message}" occured during login`);
        this.privateLoginFailed = true;
      }
    });
  }

  public get loginFailed(): boolean {
    return this.privateLoginFailed;
  }


  private signupNewUser(newUser) {
    this.authenticationService.signupNewUser(newUser);
  }

}
