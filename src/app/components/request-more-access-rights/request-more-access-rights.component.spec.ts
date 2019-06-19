import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestMoreAccessRightsComponent } from './request-more-access-rights.component';

describe('RequestMoreAccessRightsComponent', () => {
  let component: RequestMoreAccessRightsComponent;
  let fixture: ComponentFixture<RequestMoreAccessRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestMoreAccessRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestMoreAccessRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
