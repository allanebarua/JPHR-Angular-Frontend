import { TestBed } from '@angular/core/testing';

import { HealthrecordManagementService } from './healthrecord-management.service';

describe('HealthrecordManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HealthrecordManagementService = TestBed.get(HealthrecordManagementService);
    expect(service).toBeTruthy();
  });
});
