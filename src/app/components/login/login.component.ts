import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  onSubmit() {
    this.authService
      .login(this.loginForm.value.email!, this.loginForm.value.password!)
      .subscribe((result) => {
        if (result.error) {
          console.log(result.error.message);
        } else {
          console.log('Success');
        }
      });
  }

  passwordRecovery() {
    // navigate to password recovery page
  }

  signUp() {
    // navigate to sign up page
  }
}
