import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';

import { PopUpComponent } from '../components/dialogs/pop-up/pop-up.component';
import { POPUP_DATA } from '../pop-up-data.token';

@Injectable()
export class ModalService {
  overlayRef: OverlayRef;

  constructor(private overlay: Overlay, private injector: Injector) {}

  openModal<T>(componentType: ComponentType<T>, injector?: Injector) {
    if (!this.overlayRef) {
      this.overlayRef = this.createOverlay();
    }

    const inj = Injector.create(
      [
        { provide: POPUP_DATA, useValue: componentType },
        { provide: OverlayRef, useValue: this.overlayRef }
      ],
      injector || this.injector
    );

    const popUpComponentPortal = new ComponentPortal(PopUpComponent, null, inj);
    this.overlayRef.attach(popUpComponentPortal);

    this.overlayRef.backdropClick().subscribe(_ => this.dispose());
  }

  private createOverlay(): OverlayRef {
    const overlayConfig = this.getOverlayConfig();
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(): OverlayConfig {
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

  private dispose(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }
}
