import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuardService } from '../services/auth-guard.service';

import { ChatRoomsComponent } from './components/chat-rooms/chat-rooms.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { MainwindowComponent } from './components/mainwindow/mainwindow.component';
import { MessagingAreaComponent } from './components/messaging-area/messaging-area.component';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { PrivateMessageComponent } from './components/private-message/private-message.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  { path: 'main', component: MainwindowComponent, canActivate: [AuthGuardService]},
  { path: 'edit', component: EditRoomComponent, canActivate: [AuthGuardService] },
  { path: 'private', component: PrivateMessageComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  declarations: [
    ChatRoomsComponent,
    MainwindowComponent,
    EditRoomComponent,
    MessagingAreaComponent,
    UsersComponent, PrivateMessageComponent, PasswordDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
  ],
  entryComponents: [
    PasswordDialogComponent
  ]
})
export class MainModule { }
