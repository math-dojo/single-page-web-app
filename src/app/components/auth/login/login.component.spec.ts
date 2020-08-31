import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SinonStubbedInstance, createStubInstance } from 'sinon';

import { LoginComponent } from './login.component';
import { AuthenticationService } from 'src/app/services/authentication.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authSericeSpy: SinonStubbedInstance<AuthenticationService>;

  beforeEach(async(() => {
    authSericeSpy = createStubInstance(AuthenticationService);
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: AuthenticationService, useValue: authSericeSpy }
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
});
