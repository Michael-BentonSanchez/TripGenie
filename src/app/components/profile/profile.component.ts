import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  constructor(private router: Router, private dialog: MatDialog) {}
  navigateSettings() {
    this.router.navigate(['settings']);
  }

  openLogoutPopup(): void {
    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '250px',
      height: '250px',
    });
  }
}
