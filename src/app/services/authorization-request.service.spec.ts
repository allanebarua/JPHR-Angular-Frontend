import { TestBed } from '@angular/core/testing';

import { AuthorizationRequestService } from './authorization-request.service';

describe('AuthorizationRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthorizationRequestService = TestBed.get(AuthorizationRequestService);
    expect(service).toBeTruthy();
  });
});
