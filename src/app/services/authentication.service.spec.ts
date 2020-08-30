import { TestBed, async } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserPermission } from '../models/permissions';
import { AuthenticationServiceError } from './authentication-service.error';
import { createStubInstance, SinonStubbedInstance } from 'sinon';
import * as sinon from 'sinon';

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

  it('should return an observable user when login is successful', async(() => {
    const username = 'consumer';
    const password = username;
    const returnedUser: Observable<User> = authService.login(username, password);
    const expectedPermission = UserPermission.CONSUMER;
    returnedUser.subscribe({
      next: (value) => {
        expect(value.name).toEqual(username);
        expect(value.permissions.size).toEqual(1);
        expect(value.permissions.has(expectedPermission))
          .withContext( `the permission contained, ${JSON.stringify(
            Array.from(value.permissions.values()))}, did not matched the expected, ${expectedPermission} `)
          .toEqual(true);
      },
      error: (error) => {
        fail(`the returned user did not match the expectation because: ${error.message}`);
      }
    });
  }));

  it('should throw an error user when login fails', () => {
    const username = 'somebody';
    const password = username;
    expect(() => authService.login(username, password)).toThrowError(AuthenticationServiceError,
      /supplied credentials are invalid/);
  });

  it('should set the user observable to null when the user is logged out successfully', async(() => {
    const username = 'consumer';
    const password = username;
    authService.login(username, password);
    const expectedPermission = UserPermission.CONSUMER;
    authService.logout();
    authService.currentUser.subscribe({
      next: (value) => {
        expect(value).toEqual(null);
      },
      error: (error) => {
        fail(`the user did not match the expectation because: ${error.message}`);
      }
    });
  }));

  it('should redirect the user to the /login page after a successful logout', async(() => {
    const username = 'consumer';
    const password = username;
    authService.login(username, password);
    const expectedPermission = UserPermission.CONSUMER;
    authService.logout();
    authService.currentUser.subscribe({
      next: (value) => {
        expect(value).toEqual(null);
        expect(() => sinon.assert.calledOnceWithExactly(routerSpy.navigate, ['/login'])).not.toThrow();
      },
      error: fail
    });
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
