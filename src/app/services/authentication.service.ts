import { Injectable } from '@angular/core';
import { UserPermission } from '../models/permissions';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthenticationServiceError } from './authentication-service.error';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly expectedCreds = new Set(Object.keys(UserPermission).map(each => each.toLowerCase()));

  private authenticatedUserSubject: BehaviorSubject<User> = new BehaviorSubject(null);

  signupNewUser(newUser: { name: string; email: string; password: string; }) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  login(username: string, password: string): Observable<User> {
    if ((username === password) && this.expectedCreds.has(username)) {
      this.authenticatedUserSubject.next(
        new User({
          name: username,
          permissions: new Set([UserPermission[username.toUpperCase()] as UserPermission]),
          belongsToOrgWithId: 'default'
        }));
      return this.authenticatedUserSubject.asObservable();
    } else {
      throw new AuthenticationServiceError(`the username, ${username}, or its supplied credentials are invalid`);
    }
  }

  logout() {

  }

  get currentUser(): Observable<User> {
    return this.authenticatedUserSubject.asObservable();
  }
}
