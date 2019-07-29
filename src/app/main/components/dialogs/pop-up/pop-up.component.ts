import { Component, Inject, OnDestroy, InjectionToken } from '@angular/core';
import { Portal, ComponentPortal, ComponentType } from '@angular/cdk/portal';

export const POPUP_DATA = new InjectionToken<ComponentType<any>>('POPUP_DATA');

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {
  portal: Portal<any>;

  constructor(@Inject(POPUP_DATA) popUpData) {
    this.portal = new ComponentPortal(popUpData);
  }
}
