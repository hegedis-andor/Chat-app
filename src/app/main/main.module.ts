import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import { ChatRoomsComponent } from './components/side-bars/chat-rooms/chat-rooms.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { MainwindowComponent } from './components/main-window/mainwindow.component';
import { MessagingAreaComponent } from './components/messaging-area/messaging-area.component';
import { PasswordDialogComponent } from './components/dialogs/password-dialog/password-dialog.component';
import { UsersComponent } from './components/side-bars/users/users.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { EditRoomOverlayComponent } from './components/edit-room-overlay/edit-room-overlay.component';
import { ModalService } from './services/modal.service';
import { PopUpComponent } from './components/dialogs/pop-up/pop-up.component';
import { NavBarsSmartComponent } from './components/side-bars/users-smart/nav-bar-users.component';
import { NavBarChatroomComponent } from './components/side-bars/chat-rooms-smart/nav-bar-chatroom.component';

const routes: Routes = [
  {
    path: 'main/:roomAccessibility/:roomKey',
    component: MainwindowComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'main',
    component: MainwindowComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit',
    component: EditRoomComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [
    ChatRoomsComponent,
    MainwindowComponent,
    EditRoomComponent,
    MessagingAreaComponent,
    UsersComponent,
    PasswordDialogComponent,
    ConfirmDialogComponent,
    EditRoomOverlayComponent,
    PopUpComponent,
    NavBarsSmartComponent,
    NavBarChatroomComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    OverlayModule,
    PortalModule,
    RouterModule.forChild(routes)
  ],
  providers: [ModalService],
  exports: [],
  entryComponents: [
    PasswordDialogComponent,
    ConfirmDialogComponent,
    PopUpComponent,
    EditRoomOverlayComponent
  ]
})
export class MainModule {}
