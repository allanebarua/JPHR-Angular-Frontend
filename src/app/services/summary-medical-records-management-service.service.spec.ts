import { TestBed } from '@angular/core/testing';

import { SummaryMedicalRecordsManagementServiceService } from './summary-medical-records-management-service.service';

describe('SummaryMedicalRecordsManagementServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SummaryMedicalRecordsManagementServiceService = TestBed.get(SummaryMedicalRecordsManagementServiceService);
    expect(service).toBeTruthy();
  });
});
