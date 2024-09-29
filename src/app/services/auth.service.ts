import { Injectable } from '@angular/core';
import {
  AuthResponse,
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supaBase: SupabaseClient;

  // private currentUser!: string | null;
  private currentUser!: User;
  private isAuthenticated!: boolean;

  constructor(private router: Router) {
    this.supaBase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    this.authStatusListener();
  }

  authStatusListener() {
    this.supaBase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        this.isAuthenticated = true;
      } else if (event === 'SIGNED_OUT') {
        this.isAuthenticated = false;
      }
      // maybe do other elif statements for password recovery and such
    });
  }

  register(email: string, password: string): Observable<AuthResponse> {
    const promise = this.supaBase.auth.signUp({
      email,
      password,
    });
    return from(promise);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const promise = this.supaBase.auth.signInWithPassword({
      email,
      password,
    });
    return from(promise);
  }

  // Method for signing out
  logout(): void {
    this.supaBase.auth.signOut();
    this.router.navigate(['login']);
  }

  // method for getting current users id
  getCurrentUser(): User {
    // was returning string
    return this.currentUser!;
  }

  // method for setting current user id
  async setCurrentUser(id: string): Promise<void> {
    const { data, error } = await this.supaBase
      .from('User')
      .select()
      .eq('UserID', id);
    if (!error) {
      this.currentUser = {
        id: data[0]!.UserID,
        email: data[0]!.Email,
        password: data[0]!.Password,
        firstName: data[0]!.FirstName,
        lastName: data[0]!.LastName,
      };
    }
  }

  IsUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
