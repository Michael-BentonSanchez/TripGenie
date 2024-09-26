import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

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
        if (!result.error) {
          this.router.navigate(['/home']); // Navigate to home page when no errors
          console.log(result.data);
        } else {
          console.log(result.error.message); // log error in console
        }
      });
  }

  passwordRecovery() {
    this.router.navigate(['recovery']);
  }

  signUp() {
    this.router.navigate(['signup']);
  }
}
