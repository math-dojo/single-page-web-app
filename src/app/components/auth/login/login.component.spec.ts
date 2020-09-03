import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SinonStubbedInstance, createStubInstance } from 'sinon';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: SinonStubbedInstance<AuthenticationService>;
  let routerSpy: SinonStubbedInstance<Router>;

  beforeEach(async(() => {
    authServiceSpy = createStubInstance(AuthenticationService);
    routerSpy = createStubInstance(Router);
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ClarityModule, ReactiveFormsModule ]
    })
    .overrideComponent(LoginComponent, {
      set: {
        providers: [
          { provide: AuthenticationService, useValue: authServiceSpy },
          { provide: Router, useValue: routerSpy }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should link text input on the form to the model', () => {
    const page = new LoginTestPage(fixture);
    page.fillUserNameInput('fizz');
    page.fillPasswordInput('buzz');

    expect(page.componentInstanceUnderTest.userLoginFormGroup.controls.username.value).toEqual('fizz');
    expect(page.componentInstanceUnderTest.userLoginFormGroup.controls.password.value).toEqual('buzz');
  });

  it('should not display the submission status when first loaded', () => {
    const page = new LoginTestPage(fixture);
    const errorAlert: DebugElement = page.errorAlert;
    expect(errorAlert).toBeNull('the error alert could be seen');
  });

  it('logging in with the correct credentials should redirect the user to the dashboard', () => {
    // Given
    const page = new LoginTestPage(fixture);
    const username = 'consumer';
    const password = username;
    authServiceSpy.login.returns(of(new User({
      name: username,
      belongsToOrgWithId: 'default'
    })));


    // When
    page.fillUserNameInput(username);
    page.fillPasswordInput(password);
    page.raiseFormSubmitEvent();

    // Then
    return page.fixture.whenStable().then(res => {
      return Promise.all([
        expect(routerSpy.navigate.calledOnceWithExactly(['/dashboard']))
          .withContext(`the router did not navigate to the dashboard but had calls: ${routerSpy.navigate.getCalls()}\n`)
          .toEqual(true)
      ]);
    });
  });

  it('logging in with incorrect credentials should show the error alert', () => {
    // Given
    const page = new LoginTestPage(fixture);
    const username = 'incorrect';
    const password = username;
    authServiceSpy.login.returns(throwError('some login error'));


    // When
    page.fillUserNameInput(username);
    page.fillPasswordInput(password);
    page.raiseFormSubmitEvent();

    // Then
    return page.fixture.whenStable().then(res => {
      const errorAlert: DebugElement = page.errorAlert;
      return Promise.all([
        expect(routerSpy.navigate.notCalled)
          .withContext(`the router should not have been called but had calls: ${routerSpy.navigate.getCalls()}\n`)
          .toEqual(true),
        expect(expect(errorAlert.nativeElement.value).toMatch(/Invalid user name or password/))
      ]);
    });
  });
});
/**
 * Test class containing utility methods for a number of operations on the page
 */
class LoginTestPage {
  public readonly fixture: ComponentFixture<LoginComponent>;
  public readonly componentInstanceUnderTest: LoginComponent;
  private readonly loginFormElement: DebugElement;

  /**
   * Creates an instance of the page from fixture under test
   */
  constructor(
    fixtureUnderTest: ComponentFixture<LoginComponent>
  ) {
    this.fixture = fixtureUnderTest;
    this.componentInstanceUnderTest = fixtureUnderTest.componentInstance;
    this.loginFormElement = fixtureUnderTest.debugElement.query(
      By.css('form.login.mtdj__signupform')
    );
  }

  fillUserNameInput(valueToEnter: string) {
    const inputFormElement = this.fixture.debugElement.query(
      By.css('form.login.mtdj__signupform #mtdj__signupform-input-username input')
    );

    inputFormElement.nativeElement.value = valueToEnter;
    inputFormElement.nativeElement.dispatchEvent(new InputEvent('input'));
    this.fixture.detectChanges();
  }

  fillPasswordInput(valueToEnter: string) {
    const inputFormElement = this.fixture.debugElement.query(
      By.css('form.login.mtdj__signupform #mtdj__signupform-input-password input')
    );

    inputFormElement.nativeElement.value = valueToEnter;
    inputFormElement.nativeElement.dispatchEvent(new InputEvent('input'));
    this.fixture.detectChanges();
  }

  get errorAlert(): DebugElement {
    return this.fixture.debugElement.query(
      By.css('.login.mtdj__signupform .error.active.login-status')
    );
  }

  raiseFormSubmitEvent() {
    this.loginFormElement.triggerEventHandler('submit', null);
    this.fixture.detectChanges();
  }
}
