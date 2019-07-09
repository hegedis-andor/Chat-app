import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ChatRoomComponent } from './chat-room/chat-room.component';
import { MainwindowComponent } from './mainwindow/mainwindow.component';
import { NewroomComponent } from './newroom/newroom.component';


@NgModule({
  declarations: [
    ChatRoomComponent, 
    MainwindowComponent, NewroomComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    ChatRoomComponent,
    MainwindowComponent
  ]
})
export class MainModule { }
