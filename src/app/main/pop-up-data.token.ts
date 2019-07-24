import { InjectionToken } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';

export const POPUP_DATA = new InjectionToken<{ portal: ComponentPortal<any>; dipose: () => void }>(
  'POPUP_DATA'
);
