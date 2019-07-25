import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  loginForm: FormGroup;
  loginFailed: boolean;
  googleLoginFailed: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  loginWithEmailAndPassword() {
    this.authService
      .loginWithEmailAndPassword(this.email.value, this.password.value)
      .then(_ => {
        this.router.navigateByUrl('/main');
      })
      .catch(_ => {
        this.loginFailed = true;
        this.cd.markForCheck();
      });
  }

  loginWithGoogle() {
    this.authService.googleLogin().catch(_ => (this.googleLoginFailed = true));
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
