import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { MainwindowComponent } from './main/mainwindow/mainwindow.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { NewroomComponent } from './main/newroom/newroom.component';


const routes: Routes = [
  { path: 'main', component: MainwindowComponent },
  { path: 'new', component: NewroomComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
