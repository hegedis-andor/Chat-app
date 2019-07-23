import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoomOverlayComponent } from './edit-room-overlay.component';

describe('EditRoomOverlayComponent', () => {
  let component: EditRoomOverlayComponent;
  let fixture: ComponentFixture<EditRoomOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRoomOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoomOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
