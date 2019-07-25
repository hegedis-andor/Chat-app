import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarsSmartComponent } from './nav-bars-smart.component';

describe('NavBarsSmartComponent', () => {
  let component: NavBarsSmartComponent;
  let fixture: ComponentFixture<NavBarsSmartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarsSmartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarsSmartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
