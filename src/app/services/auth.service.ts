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
  constructor() {
    this.supaBase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  register(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<AuthResponse> {
    const promise = this.supaBase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
        },
      },
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
}
