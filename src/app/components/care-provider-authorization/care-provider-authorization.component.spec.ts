import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareProviderAuthorizationComponent } from './care-provider-authorization.component';

describe('CareProviderAuthorizationComponent', () => {
  let component: CareProviderAuthorizationComponent;
  let fixture: ComponentFixture<CareProviderAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareProviderAuthorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareProviderAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
