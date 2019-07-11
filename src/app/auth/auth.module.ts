import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule, FormsModule }   from '@angular/forms';

import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    SignupComponent, 
    LoginComponent
  ],
  imports: [
    CommonModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    SignupComponent,
    LoginComponent
  ]
})
export class AuthModule { }
