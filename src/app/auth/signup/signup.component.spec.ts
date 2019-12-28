import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  class AuthenticationServiceSpy {
    signupNewUser = jasmine.createSpy('signupNewUser')
      .and.callFake(() => Promise.resolve('User made :)'));
  }

  let testAuthServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        ClarityModule,
        ReactiveFormsModule
      ]
    })
      .overrideComponent(SignupComponent, {
        set: {
          providers: [
            { provide: AuthenticationService, useClass: AuthenticationServiceSpy }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    testAuthServiceSpy = fixture.debugElement.injector.get(AuthenticationService) as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the authentication service\'s signupNewUser method with the supplied args from the form', () => {
    component.onSubmit();

    expect(testAuthServiceSpy.signupNewUser.calls.count()).toBe(1);
  });

  // TODO: Implement this kind of component test for the login or signup
  // https://angular.io/guide/testing#routing-component
});
