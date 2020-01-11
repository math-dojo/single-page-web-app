import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../services/authentication.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

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
            { provide: AuthenticationService, useClass: AuthenticationServiceSpy },
            { provide: ComponentFixtureAutoDetect, useValue: true }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    testAuthServiceSpy = fixture.debugElement.injector.get(AuthenticationService) as AuthenticationServiceSpy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call its onSubmit method when the submit button is pressed', () => {
    spyOn(component, 'onSubmit');

    const signupElement: DebugElement = fixture.debugElement;
    const signupFormElement = signupElement.query(By.css('.mtdj__signupform'))

    signupFormElement.triggerEventHandler('submit', null)

    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  xit('should call the authentication service\'s signupNewUser method if validation passes', () => {
    const signupElement: DebugElement = fixture.debugElement;
    const nameField = signupElement.query(By.css('mtdj__signupform__field-name')).nativeElement
    const email = signupElement.query(By.css('mtdj__signupform__field-email')).nativeElement
    const password = signupElement.query(By.css('mtdj__signupform__field-password')).nativeElement

    component.onSubmit();

    expect(testAuthServiceSpy.signupNewUser.calls.count()).toBe(1);
  });

  // TODO: Implement this kind of component test for the login or signup
  // https://angular.io/guide/testing#routing-component
});
