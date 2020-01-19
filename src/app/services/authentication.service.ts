import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  signupNewUser(newUser: { name: string; email: string; password: string; }) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
