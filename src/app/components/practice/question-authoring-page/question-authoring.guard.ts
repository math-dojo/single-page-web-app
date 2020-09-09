 import { Injectable } from '@angular/core';
 import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
 import { UserPermission } from '../../../models/permissions';
 import { AuthenticationService } from '../../../services/authentication.service';
 import { map } from 'rxjs/operators';
 import { Observable, of } from 'rxjs';

 @Injectable({
  providedIn: 'root'
})
export class QuestionAuthoringGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService
) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authenticationService.currentUser$.pipe(map((user) => {
        return ((user.permissions.
        has(UserPermission.ORG_ADMIN) || user.permissions.has(UserPermission.CREATOR)));
    }));
  }
}
