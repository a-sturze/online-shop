import { createAction, props } from '@ngrx/store';
import { LoginFormValues } from '../../features/login/types/login-form';
import { User } from '../../types/users';

export const login = createAction('[Login Page] Login', props<LoginFormValues>());

export const loginSuccess = createAction('[Products Page] Load Login Success', props<User>());
export const loginError = createAction('[Login Page] Login Error', props<{ error: string }>());

export const logout = createAction('[Login Page] Logout');

export const logoutSuccess = createAction('[Products Page] Logout Success');

export const logoutError = createAction('[Login Page] Logout Error', props<{ error: string }>());

export const getUserProfile = createAction('[Navbar] User Profile');

export const getUserProfileSuccess = createAction(
  '[Navbar] User Profile Success',
  props<{ user: User }>()
);
export const getUserProfileError = createAction(
  '[Navbar] User Profile Error',
  props<{ error: string }>()
);
