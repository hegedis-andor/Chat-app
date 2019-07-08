import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './main/chat/chat.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  { path: 'chat', component:  ChatComponent, canActivate: []},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
