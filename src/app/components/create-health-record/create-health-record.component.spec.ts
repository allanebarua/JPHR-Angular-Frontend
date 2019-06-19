import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHealthRecordComponent } from './create-health-record.component';

describe('CreateHealthRecordComponent', () => {
  let component: CreateHealthRecordComponent;
  let fixture: ComponentFixture<CreateHealthRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHealthRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHealthRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
