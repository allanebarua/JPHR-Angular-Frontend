import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSummaryRecordComponent } from './update-summary-record.component';

describe('UpdateSummaryRecordComponent', () => {
  let component: UpdateSummaryRecordComponent;
  let fixture: ComponentFixture<UpdateSummaryRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSummaryRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSummaryRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
