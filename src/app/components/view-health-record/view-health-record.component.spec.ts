import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHealthRecordComponent } from './view-health-record.component';

describe('ViewHealthRecordComponent', () => {
  let component: ViewHealthRecordComponent;
  let fixture: ComponentFixture<ViewHealthRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewHealthRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHealthRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
