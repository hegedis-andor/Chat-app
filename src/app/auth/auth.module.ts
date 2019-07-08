import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';



@NgModule({
  declarations: [
    SignupComponent, 
    LoginComponent
  ],
  imports: [
    CommonModule,
    AngularFireAuthModule
  ]
})
export class AuthModule { }
