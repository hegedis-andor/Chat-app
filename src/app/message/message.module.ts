import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './../main/services/auth-guard.service';
import { PrivateMessageComponent } from './components/private-message/private-message.component';

const routes: Routes = [
  {
    path: 'privateMessage/:partnerName/:partnerUid',
    component: PrivateMessageComponent,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MessageModule { }
