import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from '../auth/signup/signup.component';
import { LoginComponent } from '../auth/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


const appRoots: Routes = [
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent}
]


@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forRoot(appRoots)
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
