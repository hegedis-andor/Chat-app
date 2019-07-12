import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { ChatRoomsComponent } from './components/chat-rooms/chat-rooms.component';
import { MainwindowComponent } from './components/mainwindow/mainwindow.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { UsersComponent } from './components/users/users.component';
import { MessagingAreaComponent } from './components/messaging-area/messaging-area.component';
import { PrivateMessageComponent } from './components/private-message/private-message.component';
import { PasswordDialogComponent } from './components/password-dialog/password-dialog.component';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  { path: 'main', component: MainwindowComponent, canActivate: [AuthGuardService]},
  { path: 'edit', component: EditRoomComponent, canActivate: [AuthGuardService] },
  { path: 'private', component: PrivateMessageComponent, canActivate: [AuthGuardService] },
]

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
