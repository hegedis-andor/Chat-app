import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginFailed: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginWithEmailAndPassword() {
    this.authService.loginWithEmailAndPassword(this.email.value, this.password.value).then( _ => {
      this.router.navigateByUrl('/main');
    }).catch( error => {
      this.loginFailed = true;
    });


  }

  loginWithGoogle() {
    this.authService.googleLogin();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
