import { Component, Inject } from '@angular/core';
import { Portal } from '@angular/cdk/portal';
import { POPUP_DATA } from '../../pop-up-data.token';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent {
  portal: Portal<any>;

  constructor(@Inject(POPUP_DATA) popUpData) {
    this.portal = popUpData.portal;
  }
}
