import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers';
import { User } from '../../types/users';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, (state: AuthState) => state.user);

export const selectIsAuthenticated = createSelector(selectUser, (user: User | null) => !!user);

export const selectAuthError = createSelector(selectAuthState, (state: AuthState) => state.error);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.loading
);
