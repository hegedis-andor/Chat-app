import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ChatRoomsComponent } from './chat-rooms/chat-rooms.component';
import { MainwindowComponent } from './mainwindow/mainwindow.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { Routes, RouterModule } from '@angular/router';
import { OnlineUsersComponent } from './online-users/online-users.component';
import { MessagingAreaComponent } from './messaging-area/messaging-area.component';

const routes: Routes = [
  { path: 'main', component: MainwindowComponent, },
  { path: 'edit', component: EditRoomComponent },
]

@NgModule({
  declarations: [
    ChatRoomsComponent, 
    MainwindowComponent, 
    EditRoomComponent, 
    MessagingAreaComponent, 
    OnlineUsersComponent
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
