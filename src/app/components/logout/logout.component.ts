import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    public dialogRef: MatDialogRef<LogoutComponent>
  ) {}

  logout() {
    this.authService.logout();
    this.dialogRef.close();
    this.router.navigate(['signin']);
  }
}
