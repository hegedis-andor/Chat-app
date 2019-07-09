import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { ChatRoomComponent } from './chat-room/chat-room.component';
import { MainwindowComponent } from './mainwindow/mainwindow.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'edit', component: EditRoomComponent}
]

@NgModule({
  declarations: [
    ChatRoomComponent, 
    MainwindowComponent, 
    EditRoomComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ChatRoomComponent,
    MainwindowComponent
  ]
})
export class MainModule { }
