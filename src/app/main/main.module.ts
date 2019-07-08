import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'chat', component:  ChatComponent, canActivate: []},

];

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ChatComponent
  ]
})
export class MainModule { }
