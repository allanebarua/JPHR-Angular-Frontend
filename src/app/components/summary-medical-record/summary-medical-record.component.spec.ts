import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryMedicalRecordComponent } from './summary-medical-record.component';

describe('SummaryMedicalRecordComponent', () => {
  let component: SummaryMedicalRecordComponent;
  let fixture: ComponentFixture<SummaryMedicalRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryMedicalRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryMedicalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
