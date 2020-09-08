import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UserPermission } from '../../../models/permissions';
import { AuthenticationService } from '../../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionAuthoringGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService
) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let isPermitted  = false;
      this.authenticationService.currentUser$.subscribe( x => x.permissions.
           has(UserPermission.ORG_ADMIN) ? isPermitted = true : isPermitted = false);
      return isPermitted;
  }

}
