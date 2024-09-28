import { Injectable } from '@angular/core';
import {
  AuthResponse,
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supaBase: SupabaseClient;

  private currentUser!: string | null;

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
        this.currentUser = session?.user.id!;
      } else if (event === 'SIGNED_OUT') {
        this.currentUser = null;
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
  getCurrentUser(): string {
    return this.currentUser!;
  }

  // method for setting current user id
  setCurrentUser(id: string): void {
    this.currentUser = id;
  }
}
