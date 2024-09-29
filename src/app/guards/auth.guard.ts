import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // const user = this.authService.getCurrentUser();
    const isAuthenticated = this.authService.IsUserAuthenticated();

    if (isAuthenticated) {
      // was user in if statement
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
