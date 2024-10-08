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

  errorMessage!: string | null;

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
          this.authService.setCurrentUser(result.data.user?.id!);
          this.router.navigate(['home']); // Navigate to home page when no errors
        } else {
          this.errorMessage = result.error.message;
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
