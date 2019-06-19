import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProvidersComponent } from './my-providers.component';

describe('MyProvidersComponent', () => {
  let component: MyProvidersComponent;
  let fixture: ComponentFixture<MyProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProvidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
