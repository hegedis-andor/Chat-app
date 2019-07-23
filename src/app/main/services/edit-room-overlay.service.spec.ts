import { TestBed } from '@angular/core/testing';

import { EditRoomOverlayService } from './edit-room-overlay.service';

describe('EditRoomOverlayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditRoomOverlayService = TestBed.get(EditRoomOverlayService);
    expect(service).toBeTruthy();
  });
});
