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
  const routeStateMock: any = { snapshot: {}, url: ''};
  const routeMock: any = { snapshot: {}};
  const routerMock = {navigate: jasmine.createSpy('navigate')};

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


  it('should allow the authenticated user to access app', () => {
    const user = new User({
      name: 'test',
      permissions: new Set([UserPermission.ORG_ADMIN]),
      belongsToOrgWithId: 'default'
    });
    spyOnProperty(authService, 'currentUser$').and.returnValue(of(user));
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });

  it('should not allow the unauthenticated user to access app', () => {
    const user = new User({
      name: 'test',
      permissions: new Set([UserPermission.CREATOR]),
      belongsToOrgWithId: 'default'
    });
    spyOnProperty(authService, 'currentUser$').and.returnValue(of(user));
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
  });
});
