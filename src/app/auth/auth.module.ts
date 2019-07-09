import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    SignupComponent, 
    LoginComponent
  ],
  imports: [
    CommonModule,
    AngularFireAuthModule
  ],
  exports: [
    SignupComponent,
    LoginComponent
  ]
})
export class AuthModule { }
