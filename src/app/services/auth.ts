import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { map, Observable, of, switchMap, take, tap } from 'rxjs';
import { LoginFormType } from '../features/login/types/login-form';
import { AuthClientService } from './auth-client';
import { User } from '../types/users';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly clientService = inject(AuthClientService);
  private readonly router = inject(Router);
  private readonly _hasError = signal<boolean>(false);
  private readonly token = signal<string | null>(localStorage.getItem('token'));
  private readonly _user = signal<User | null>(null);

  public readonly isAuthenticated = computed<boolean>(() => !!this.token());

  init(): Observable<void> {
    const token = this.token();
    if (token) {
      return this.getUserProfile(token).pipe(
        map(() => {
          return undefined;
        })
      );
    }
    return of();
  }

  public get getToken(): Signal<string | null> {
    return this.token.asReadonly();
  }

  public get hasError(): Signal<boolean> {
    return this._hasError.asReadonly();
  }

  public get user(): Signal<User | null> {
    return this._user.asReadonly();
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token.set(null);
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  login(loginData: LoginFormType): Observable<User> {
    return this.clientService.login(loginData).pipe(
      tap(({ access_token }) => {
        localStorage.setItem('token', access_token);
        this.token.set(access_token);
        this._hasError.set(false);
      }),
      switchMap(({ access_token }) => this.getUserProfile(access_token)),
      tap({
        error: () => this._hasError.set(true),
      })
    );
  }

  getUserProfile(token: string) {
    return this.clientService.getUserProfile(token).pipe(
      tap({
        next: (reponse: User) => {
          this._hasError.set(false);
          this._user.set(reponse);
        },
        error: () => this._hasError.set(true),
      })
    );
  }
}
