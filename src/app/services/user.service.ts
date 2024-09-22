import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private supaBase: SupabaseClient;
  constructor() {
    this.supaBase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async createUser(
    id: string,
    email: string,
    password: string,
    FirstName: string,
    lastName: string
  ) {
    const { data, error } = await this.supaBase.from('User').insert({
      UserID: id,
      Email: email,
      Password: password,
      FirstName: FirstName,
      LastName: lastName,
    });
    console.log(error);
    console.log(data);
  }
}
