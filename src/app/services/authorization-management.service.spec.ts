import { TestBed } from '@angular/core/testing';

import { AuthorizationManagementService } from './authorization-management.service';

describe('AuthorizationManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizationManagementService = TestBed.get(AuthorizationManagementService);
    expect(service).toBeTruthy();
  });
});
