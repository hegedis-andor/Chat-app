import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';

import { ChatRoomsComponent } from './components/chat-rooms/chat-rooms.component';
import { MainwindowComponent } from './components/mainwindow/mainwindow.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { UsersComponent } from './components/users/users.component';
import { MessagingAreaComponent } from './components/messaging-area/messaging-area.component';
import { PrivateMessageComponent } from './components/private-message/private-message.component';

const routes: Routes = [
  { path: 'main', component: MainwindowComponent, },
  { path: 'edit', component: EditRoomComponent },
  { path: 'private', component: PrivateMessageComponent },
]

@NgModule({
  declarations: [
    ChatRoomsComponent, 
    MainwindowComponent, 
    EditRoomComponent, 
    MessagingAreaComponent, 
    UsersComponent, PrivateMessageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MainwindowComponent
  ],
})
export class MainModule { }
