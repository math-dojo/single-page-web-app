import { ComponentFixture, TestBed, ComponentFixtureAutoDetect, waitForAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { createStubInstance } from 'sinon';

import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';
import { AuthenticationService } from '../../../services/authentication.service';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  const testAuthServiceSpy = createStubInstance(AuthenticationService);
  testAuthServiceSpy.signupNewUser.callsFake(() => Promise.resolve('User made :)'));

  beforeEach(waitForAsync(() => {
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
            { provide: AuthenticationService, useValue: testAuthServiceSpy },
            { provide: ComponentFixtureAutoDetect, useValue: true }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call its onSubmit method when the submit button is pressed', () => {
    spyOn(component, 'onSubmit');

    const signupElement: DebugElement = fixture.debugElement;
    const signupFormElement = signupElement.query(By.css('.mtdj__signupform'));

    signupFormElement.triggerEventHandler('submit', null);

    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  xit('should call the authentication service\'s signupNewUser method if validation passes', () => {
    const signupElement: DebugElement = fixture.debugElement;
    const nameField = signupElement.query(By.css('mtdj__signupform__field-name')).nativeElement;
    const email = signupElement.query(By.css('mtdj__signupform__field-email')).nativeElement;
    const password = signupElement.query(By.css('mtdj__signupform__field-password')).nativeElement;

    component.onSubmit();

    expect(testAuthServiceSpy.signupNewUser.callCount).toBe(1);
  });

  // TODO: Implement this kind of component test for the login or signup
  // https://angular.io/guide/testing#routing-component
  xit('should route to the dashboard page if authentication response is successful', () => {
    const signupElement: DebugElement = fixture.debugElement;
    const nameField = signupElement.query(By.css('mtdj__signupform__field-name')).nativeElement;
    const email = signupElement.query(By.css('mtdj__signupform__field-email')).nativeElement;
    const password = signupElement.query(By.css('mtdj__signupform__field-password')).nativeElement;

    component.onSubmit();

    expect(testAuthServiceSpy.signupNewUser.callCount).toBe(1);
  });

  xit('should not route to the dashboard page if authentication response fails', () => {
    const signupElement: DebugElement = fixture.debugElement;
    const nameField = signupElement.query(By.css('mtdj__signupform__field-name')).nativeElement;
    const email = signupElement.query(By.css('mtdj__signupform__field-email')).nativeElement;
    const password = signupElement.query(By.css('mtdj__signupform__field-password')).nativeElement;

    component.onSubmit();

    expect(testAuthServiceSpy.signupNewUser.callCount).toBe(1);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
