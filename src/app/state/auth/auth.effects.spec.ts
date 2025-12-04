import { Observable, of } from 'rxjs';
import { AuthEffects } from './auth.effects';
import { TestBed } from '@angular/core/testing';
import { Actions, EffectsMetadata, getEffectsMetadata } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, ActionCreator } from '@ngrx/store';
import { AuthService } from '../../services/auth';
import {
  getUserProfile,
  getUserProfileError,
  getUserProfileSuccess,
  login,
  loginError,
  loginSuccess,
  logout,
} from './auth.actions';
import { User } from '../../types/users';
import { LoginFormValues } from '../../features/login/types/login-form';
import { cold, hot } from 'jasmine-marbles';
import { Router } from '@angular/router';

describe('Auth Effects', () => {
  let actions$ = new Observable<Action>();
  let effects: AuthEffects;
  let authService: AuthService;
  const user: User = {
    id: '1',
    username: 'andreea',
    fullname: 'andreea',
    roles: ['user', 'admin'],
  };
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        { provide: AuthService, useFactory: () => ({}) },
        provideMockActions(() => actions$),
        { provider: Router, useFactory: () => ({ navigate: () => {} }) },
      ],
    });
    effects = TestBed.inject(AuthEffects);
    actions$ = TestBed.inject(Actions);
    authService = TestBed.inject(AuthService);
  });

  describe('login', () => {
    const loginData = { username: 'andreea', password: 'password' };
    const action = login(loginData);

    it('should return the loginSuccess action on success', () => {
      const outcome = loginSuccess({ user });

      actions$ = hot('a', { a: action });

      authService.login = () => cold('--d|', { d: { access_token: '123' } });
      authService.getUserProfile = () => cold('---c|', { c: user });

      const expected = cold('-----b', { b: outcome });

      expect(effects.login$).toBeObservable(expected);
    });

    it('should return the loginError action on failure', () => {
      const errorMessage = 'Some error';
      const outcome = loginError({ error: errorMessage });

      actions$ = hot('-a', { a: action });

      const expected = cold('--b', { b: outcome });

      authService.login = () => cold('-#|', {}, { message: errorMessage });

      expect(effects.login$).toBeObservable(expected);
    });

    it('should set token in local storage', () => {
      const setTokenSpy = spyOn(window.localStorage, 'setItem');
      const outcome = loginSuccess({ user });

      actions$ = hot('a', { a: action });

      authService.login = () => cold('--d|', { d: { access_token: '123' } });
      authService.getUserProfile = () => cold('---c|', { c: user });

      const expected = cold('-----b', { b: outcome });

      expect(effects.login$).toBeObservable(expected);
      expect(setTokenSpy).toHaveBeenCalledOnceWith('token', '123');
    });
  });

  it('should redirect after login', () => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');

    const action = loginSuccess({ user });

    actions$ = hot('-a', { a: action });
    expect(effects.afterLoginSuccess$).toBeObservable(cold('-a', { a: action }));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['/products']);
  });

  it('should redirect after logout', () => {
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');
    const removeTokenSpy = spyOn(window.localStorage, 'removeItem');

    const action = logout();

    actions$ = hot('-a', { a: action });
    expect(effects.logout$).toBeObservable(cold('-a', { a: action }));

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
    expect(removeTokenSpy).toHaveBeenCalledTimes(1);
    expect(removeTokenSpy).toHaveBeenCalledWith('token');
  });

  describe('get user profile', () => {
    const token = '123';
    const action = getUserProfile();
    let spy: jasmine.Spy;

    beforeEach(() => {
      spy = spyOn(window.localStorage, 'getItem').and.callFake(() => token);
    });

    it('should return the getUserProfileSuccess action on success', () => {
      const outcome = getUserProfileSuccess({ user });

      actions$ = hot('a', { a: action });

      authService.getUserProfile = () => cold('---c|', { c: user });

      const expected = cold('---b', { b: outcome });

      expect(effects.getUserProfile$).toBeObservable(expected);
    });

    it('should return the getUserProfileError action on failure', () => {
      const errorMessage = 'Some error';
      const outcome = getUserProfileError({ error: errorMessage });

      actions$ = hot('-a', { a: action });

      authService.getUserProfile = () => cold('--#|', {}, { message: errorMessage });

      const expected = cold('---b', { b: outcome });

      expect(effects.getUserProfile$).toBeObservable(expected);
    });
  });
});
