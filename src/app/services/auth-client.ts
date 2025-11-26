import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginFormType } from '../features/login/types/login-form';
import { User } from '../types/users';

@Injectable({
  providedIn: 'root',
})
export class AuthClientService {
  private readonly http = inject(HttpClient);
  private readonly BASE_URL = `${environment.apiUrl}/auth`;

  public login(loginData: LoginFormType): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.BASE_URL}/login`, loginData);
  }

  public getUserProfile(token: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
