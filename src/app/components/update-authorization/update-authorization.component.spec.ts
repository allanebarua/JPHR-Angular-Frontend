import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAuthorizationComponent } from './update-authorization.component';

describe('UpdateAuthorizationComponent', () => {
  let component: UpdateAuthorizationComponent;
  let fixture: ComponentFixture<UpdateAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAuthorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
