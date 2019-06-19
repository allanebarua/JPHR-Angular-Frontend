import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareProviderComponent } from './care-provider.component';

describe('CareProviderComponent', () => {
  let component: CareProviderComponent;
  let fixture: ComponentFixture<CareProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
