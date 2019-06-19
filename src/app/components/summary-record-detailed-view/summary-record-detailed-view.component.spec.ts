import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryRecordDetailedViewComponent } from './summary-record-detailed-view.component';

describe('SummaryRecordDetailedViewComponent', () => {
  let component: SummaryRecordDetailedViewComponent;
  let fixture: ComponentFixture<SummaryRecordDetailedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryRecordDetailedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryRecordDetailedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
