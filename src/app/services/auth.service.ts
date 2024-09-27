import { Injectable } from '@angular/core';
import {
  AuthResponse,
  createClient,
  SupabaseClient,
} from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supaBase: SupabaseClient;

  private currentUser!: string | null;

  constructor() {
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
    const promise = this.supaBase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then((response) => {
        if (response.data.session) {
          this.storeJwt(response.data.session.access_token);
        }
        return response;
      });
    return from(promise);
  }

  // Method for signing out
  logout(): void {
    this.supaBase.auth.signOut().then(() => {
      localStorage.removeItem('jwt');
    });
  }

  // Method to add JWT to localStorage
  storeJwt(token: string): void {
    localStorage.setItem('jwt', token);
  }

  // Method to remove JWT from localStorage
  removeJwt(): void {
    localStorage.removeItem('jwt');
  }

  // Method for returning the JWT token
  getJwt(): string {
    return localStorage.getItem('jwt')!;
  }

  getCurrentUser(): string {
    return this.currentUser!;
  }
}
