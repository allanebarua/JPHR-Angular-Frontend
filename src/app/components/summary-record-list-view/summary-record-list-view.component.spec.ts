import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryRecordListViewComponent } from './summary-record-list-view.component';

describe('SummaryRecordListViewComponent', () => {
  let component: SummaryRecordListViewComponent;
  let fixture: ComponentFixture<SummaryRecordListViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryRecordListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryRecordListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
