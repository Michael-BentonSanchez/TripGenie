import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(private authService: AuthService) {}

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
    // console.log(this.signupForm.value.lastname);
    this.authService
      .register(
        this.signupForm.value.email!,
        this.signupForm.value.password!,
        this.signupForm.value.firstname!,
        this.signupForm.value.lastname!
      )
      .subscribe((result) => {
        if (result.error) {
          console.log(result.error.message);
        } else {
          console.log('Success');
        }
      });
  }
}
