import { TestBed } from '@angular/core/testing';

import { QuestionAuthoringGuard } from './question-authoring.guard';
import { AuthenticationService } from '../../../services/authentication.service';
import { User } from '../../../models/user';
import { UserPermission } from '../../../models/permissions';
import { of, Observable } from 'rxjs';
import { Router } from '@angular/router';

describe('QuestionAuthoringGuard', () => {
  let guard: QuestionAuthoringGuard;
  let authService: AuthenticationService;
  const routeStateMock: any = { snapshot: {}, url: '' };
  const routeMock: any = { snapshot: {} };
  const routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionAuthoringGuard, { provide: Router, useValue: routerMock }, ]
    });
    guard = TestBed.inject(QuestionAuthoringGuard);
    authService = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });


  it('should allow the org admin user to access authoring page', () => {
    const user = new User({
      name: 'test',
      permissions: new Set([UserPermission.ORG_ADMIN]),
      belongsToOrgWithId: 'default'
    });
    spyOnProperty(authService, 'currentUser$').and.returnValue(of(user));
    guard.canActivate(routeMock, routeStateMock).subscribe((resp) => {
      expect(resp).toEqual(true);
    });
  });

  it('should allow creators user to access authoring page', () => {
    const user = new User({
      name: 'test',
      permissions: new Set([UserPermission.CREATOR]),
      belongsToOrgWithId: 'default'
    });
    spyOnProperty(authService, 'currentUser$').and.returnValue(of(user));
    guard.canActivate(routeMock, routeStateMock).subscribe((resp) => {
      expect(resp).toEqual(true);
    });
  });

  it('should not allow consumers to access authoring page', () => {
    const user = new User({
      name: 'test',
      permissions: new Set([UserPermission.CONSUMER]),
      belongsToOrgWithId: 'default'
    });
    spyOnProperty(authService, 'currentUser$').and.returnValue(of(user));
    guard.canActivate(routeMock, routeStateMock).subscribe((resp) => {
      expect(resp).toEqual(false);
    });
  });

  it('should not allow global admin to access authoring page', () => {
    const user = new User({
      name: 'test',
      permissions: new Set([UserPermission.GLOBAL_ADMIN]),
      belongsToOrgWithId: 'default'
    });
    spyOnProperty(authService, 'currentUser$').and.returnValue(of(user));
    guard.canActivate(routeMock, routeStateMock).subscribe((resp) => {
      expect(resp).toEqual(false);
    });
  });
});
