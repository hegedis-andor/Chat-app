import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarChatroomComponent } from './nav-bar-chatroom.component';

describe('NavBarChatroomComponent', () => {
  let component: NavBarChatroomComponent;
  let fixture: ComponentFixture<NavBarChatroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarChatroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarChatroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
