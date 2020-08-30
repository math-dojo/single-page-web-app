import { TestBed, async } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserPermission } from '../models/permissions';

describe('AuthenticationService', () => {
  let authService: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
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

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
