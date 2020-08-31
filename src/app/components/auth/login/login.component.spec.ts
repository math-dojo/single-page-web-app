import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SinonStubbedInstance, createStubInstance } from 'sinon';

import { LoginComponent } from './login.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: SinonStubbedInstance<AuthenticationService>;

  beforeEach(async(() => {
    authServiceSpy = createStubInstance(AuthenticationService);
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy }
      ]
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

    expect(page.componentInstanceUnderTest.userLoginForm.controls.username.value).toEqual('fizz');
    expect(page.componentInstanceUnderTest.userLoginForm.controls.password.value).toEqual('buzz');
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
  }
}
