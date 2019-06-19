import { TestBed } from '@angular/core/testing';

import { IdentityManagementService } from './identity-management.service';

describe('IdentityManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdentityManagementService = TestBed.get(IdentityManagementService);
    expect(service).toBeTruthy();
  });
});
