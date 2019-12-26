import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  class AuthenticationServiceSpy {
    signupNewUser = jasmine.createSpy('signupNewUser')
      .and.callFake(() => Promise.resolve('User made :)'));
  }

  let testAuthServiceSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ClarityModule,
        ReactiveFormsModule
      ]
    })
      .overrideComponent(LoginComponent, {
        set: {
          providers: [
            { provide: AuthenticationService, useClass: AuthenticationServiceSpy }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
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
});
