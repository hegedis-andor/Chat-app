import { Injectable, Injector, ComponentRef } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { Room } from '../models/room.model';
import { ROOM_OVERLAY_DATA } from '../room-overlay.tokens';
import { EditRoomOverlayRef } from '../edit-room-overlayref';
import { EditRoomOverlayComponent } from '../components/edit-room-overlay/edit-room-overlay.component';

@Injectable()
export class EditRoomOverlayService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  openDialog(component, room: Room) {
    const overlayRef = this.createOverlay();

    const editRoomOverlayRef = new EditRoomOverlayRef(overlayRef);
    this.attachDialogContainer(component, overlayRef, editRoomOverlayRef, room);

    overlayRef.backdropClick().subscribe(_ => overlayRef.detach());

    return editRoomOverlayRef;
  }

  createOverlay() {
    const overlayConfig = this.getOverlayConfig();

    return this.overlay.create(overlayConfig);
  }

  getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }

  attachDialogContainer(component, overlayRef, editRoomOverlayRef, room: Room) {
    const injector = this.createInjector(editRoomOverlayRef, room);
    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef: ComponentRef<
      EditRoomOverlayComponent
    > = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  createInjector(editRoomOverlayRef, room: Room): PortalInjector {
    const injectionTokens = new WeakMap();
    injectionTokens.set(ROOM_OVERLAY_DATA, room);
    injectionTokens.set(EditRoomOverlayRef, editRoomOverlayRef);

    return new PortalInjector(this.injector, injectionTokens);
  }
}
