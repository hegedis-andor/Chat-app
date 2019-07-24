import { OverlayRef } from '@angular/cdk/overlay';

export class EditRoomOverlayRef {
  constructor(private overlayRef: OverlayRef) {}

  close(): void {
    this.overlayRef.dispose();
  }
}
