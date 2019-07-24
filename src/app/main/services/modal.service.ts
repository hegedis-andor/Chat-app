import { Injectable, Injector } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { PopUpComponent } from '../components/pop-up/pop-up.component';
import { POPUP_DATA } from '../pop-up-data.token';
import { OVERLAYREF_DATA } from '../overlay-ref.token';

@Injectable()
export class ModalService {
  overlayRef: OverlayRef;

  constructor(private overlay: Overlay, private injector: Injector) {}

  openModal(componentPortal: ComponentPortal<any>) {
    if (!this.overlayRef) {
      this.overlayRef = this.createOverlay();
    }

    const injector = Injector.create(
      [
        {
          provide: POPUP_DATA,
          useValue: { portal: componentPortal, dispose: () => this.dispose() }
        }
      ],
      this.injector
    );

    const popUpComponentPortal = new ComponentPortal(PopUpComponent, null, injector);
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
