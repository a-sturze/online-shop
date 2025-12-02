import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, of, switchMap, tap } from 'rxjs';
import {
  getUserProfile,
  getUserProfileError,
  getUserProfileSuccess,
  login,
  loginError,
  loginSuccess,
  logout,
} from './auth.actions';
import { AuthService } from '../../services/auth';
import { LoginFormValues } from '../../features/login/types/login-form';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private readonly TOKEN_KEY = 'token';
  private readonly actions$ = inject(Actions);
  private readonly router = inject(Router);
  private readonly authClient = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((loginData: LoginFormValues) =>
        this.authClient.login(loginData).pipe(
          tap(({ access_token }) => {
            localStorage.setItem(this.TOKEN_KEY, access_token);
          }),
          switchMap(({ access_token }) => this.authClient.getUserProfile(access_token)),
          map((user) => loginSuccess(user)),
          catchError((error) => of(loginError({ error: error.message })))
        )
      )
    )
  );

  afterLoginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(() => {
          this.router.navigate(['/products']);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.removeItem(this.TOKEN_KEY);
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  getUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getUserProfile),
      switchMap(() => {
        const token = localStorage.getItem(this.TOKEN_KEY);
        if (token) {
          return this.authClient.getUserProfile(token).pipe(
            map((user) => getUserProfileSuccess({ user })),
            catchError((error) => of(getUserProfileError({ error: error.message })))
          );
        }
        return of(getUserProfileError({ error: 'No token found' }));
      })
    )
  );
}
