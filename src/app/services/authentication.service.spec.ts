import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { createStubInstance, SinonStubbedInstance } from 'sinon';

import { AssertionTools } from 'src/testing/assertion-tools';

import { AuthenticationService } from './authentication.service';
import { User } from '../models/user';
import { UserPermission } from '../models/permissions';
import { AuthenticationServiceError } from './authentication-service.error';

describe('AuthenticationService', () => {
  let authService: AuthenticationService;
  let routerSpy: SinonStubbedInstance<Router>;

  beforeEach(() => {
    routerSpy = createStubInstance(Router);
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    });
    authService = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    const service: AuthenticationService = TestBed.inject(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it('should return an observable user when login is successful', waitForAsync(() => {
    const username = 'consumer';
    const password = username;
    const returnedUser$: Observable<User> = authService.login(username, password);
    const expectedPermission = UserPermission.CONSUMER;
    returnedUser$.subscribe({
      next: (returnedUser) => {
        expect(returnedUser.name).toEqual(username);
        expect(returnedUser.permissions.size).toEqual(1);
        expect(returnedUser.permissions.has(expectedPermission))
          .withContext( `the permission contained, ${JSON.stringify(
            Array.from(returnedUser.permissions.values()))}, did not matched the expected, ${expectedPermission} `)
          .toEqual(true);
      },
      error: (error) => {
        fail(`the returned user did not match the expectation because: ${error.message}`);
      }
    });
  }));

  it('should return an observable authentication service error when login fails', waitForAsync(() => {
    const username = 'somebody';
    const password = username;

    authService.login(username, password).subscribe({
      next: user => fail(`expected to return an error observable but a user, ${user} was returned instead`),
      error: AssertionTools.checkErrorThrown(AuthenticationServiceError, /supplied credentials are invalid/)
    });
  }));

  it('should set the user observable to null when the user is logged out successfully', waitForAsync(() => {
    const username = 'consumer';
    const password = username;
    authService.login(username, password);
    const expectedPermission = UserPermission.CONSUMER;
    authService.logout();
    authService.currentUser$.subscribe({
      next: (currentUser) => {
        expect(currentUser).toEqual(null);
      },
      error: (error) => {
        fail(`the user did not match the expectation because: ${error.message}`);
      }
    });
  }));

  it('should redirect the user to the login page after a successful logout', waitForAsync(() => {
    const username = 'consumer';
    const password = username;
    authService.login(username, password);
    const expectedPermission = UserPermission.CONSUMER;
    authService.logout();
    authService.currentUser$.subscribe({
      next: (currentUser) => {
        expect(currentUser).toEqual(null, `expected the current user to be null but it was not.`);
        expect(routerSpy.navigate.calledOnceWithExactly(['/auth/login']))
        .withContext('the router was not called with the expected argument')
        .toEqual(true);
      },
      error: fail
    });
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
