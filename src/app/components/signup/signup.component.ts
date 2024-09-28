import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  errorMessage!: string | null;

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
  });

  onSubmit() {
    this.authService
      .register(
        this.signupForm.value.email!,
        this.signupForm.value.password!
        // this.signupForm.value.firstname!,
        // this.signupForm.value.lastname!
      )
      .subscribe((result) => {
        if (!result.error) {
          this.userService.createUser(
            result.data.user?.id!,
            this.signupForm.value.email!,
            this.signupForm.value.password!,
            this.signupForm.value.firstname!,
            this.signupForm.value.lastname!
          );
          this.authService.setCurrentUser(result.data.user?.id!);
          this.router.navigate(['home']);
          if (this.errorMessage) {
            this.errorMessage = null;
          }
        } else {
          this.errorMessage = result.error.message;
        }
      });
  }

  login() {
    this.router.navigate(['login']);
  }
}
