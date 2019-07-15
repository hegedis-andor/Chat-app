import { AuthService } from 'src/app/shared/services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm: FormGroup;
  serverErrorMessage: string;

  constructor(private authService: AuthService) {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  signUp() {
    this.authService.signUpWithEmailAndPassword(this.username.value, this.email.value, this.password.value)
      .catch( (error: Error) => this.serverErrorMessage = error.message );
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }
}
