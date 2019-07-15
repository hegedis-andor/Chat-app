import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';

import { ChatRoomsComponent } from './components/chat-rooms-bar/chat-rooms.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { MainwindowComponent } from './components/main-window/mainwindow.component';
import { MessagingAreaComponent } from './components/messaging-area/messaging-area.component';
import { PasswordDialogComponent } from './components/dialogs/password-dialog/password-dialog.component';
import { UsersComponent } from './components/users-bar/users.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';


const routes: Routes = [
  { path: 'main', component: MainwindowComponent, canActivate: [AuthGuardService]},
  { path: 'edit', component: EditRoomComponent, canActivate: [AuthGuardService] },
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
    RouterModule.forChild(routes)
  ],
  exports: [
  ],
  entryComponents: [
    PasswordDialogComponent,
    ConfirmDialogComponent
  ]
})
export class MainModule { }
