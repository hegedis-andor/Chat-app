import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { PortalInjector } from '@angular/cdk/portal';

@Injectable()
export class EditRoomOverlayService {
  constructor(private overlay: Overlay) {}

  openDialog(componentPortal) {
    const overlayRef = this.createOverlay();
    overlayRef.attach(componentPortal);

    return overlayRef;
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

  createInjector(): PortalInjector {
    return new PortalInjector();
  }
}
