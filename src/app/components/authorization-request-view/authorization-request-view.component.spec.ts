import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationRequestViewComponent } from './authorization-request-view.component';

describe('AuthorizationRequestViewComponent', () => {
  let component: AuthorizationRequestViewComponent;
  let fixture: ComponentFixture<AuthorizationRequestViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizationRequestViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationRequestViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
