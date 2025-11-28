import { createReducer, on } from '@ngrx/store';

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

export interface AuthState {
  user: User | null;
  error: string | null;
  loading: boolean;
}
export const initialState: AuthState = {
  user: null,
  error: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, loading: true, error: null })),
  on(loginSuccess, (state, user) => ({
    ...state,
    user: user,
    error: null,
    loading: false,
  })),
  on(loginError, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(logout, () => initialState),
  on(getUserProfile, (state) => ({ ...state, loading: true, error: null })),
  on(getUserProfileSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false,
    error: null,
  })),
  on(getUserProfileError, (state, { error }) => ({
    ...state,
    loading: false,
  }))
);
