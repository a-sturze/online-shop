import { User } from '../../types/users';
import {
  getUserProfile,
  getUserProfileError,
  getUserProfileSuccess,
  login,
  loginError,
  loginSuccess,
  logout,
} from './auth.actions';
import * as fromReducer from './auth.reducers';

describe('authReducers', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const { initialState } = fromReducer;
      const action = {
        type: 'Unknown',
      };
      const state = fromReducer.authReducer(initialState, action);

      expect(state).toEqual(initialState);
    });
  });

  describe('login', () => {
    it('action', () => {
      const { initialState } = fromReducer;
      const action = login({ username: 'andreea', password: 'password' });
      const state = fromReducer.authReducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: true, error: null });
    });

    it('success', () => {
      const { initialState } = fromReducer;
      const user: User = {
        id: '1',
        username: 'andreea',
        fullname: 'andreea',
        roles: ['user', 'admin'],
      };
      const action = loginSuccess({ user });
      const state = fromReducer.authReducer(initialState, action);
      expect(state).toEqual({ ...initialState, user: user, loading: false, error: null });
    });

    it('error', () => {
      const { initialState } = fromReducer;
      const error = 'Incorrect username or password';
      const action = loginError({ error });
      const state = fromReducer.authReducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: false, error: error });
    });
  });

  it('logout action', () => {
    const { initialState } = fromReducer;
    const action = logout();
    const state = fromReducer.authReducer(initialState, action);
    expect(state).toEqual(fromReducer.initialState);
  });

  describe('getUserProfile', () => {
    it('action', () => {
      const { initialState } = fromReducer;
      const action = getUserProfile();
      const state = fromReducer.authReducer(initialState, action);
      expect(state).toEqual({ ...initialState, error: null, loading: true });
    });

    it('success', () => {
      const { initialState } = fromReducer;
      const user: User = {
        id: '1',
        username: 'andreea',
        fullname: 'andreea',
        roles: ['user', 'admin'],
      };
      const action = getUserProfileSuccess({ user });
      const newState = { ...initialState, error: null, loading: false, user: user };
      const state = fromReducer.authReducer(initialState, action);
      expect(state).toEqual(newState);
    });

    it('error', () => {
      const { initialState } = fromReducer;
      const action = getUserProfileError({ error: 'Unauthenticated' });
      const state = fromReducer.authReducer(initialState, action);
      expect(state).toEqual({ ...initialState, loading: false });
    });
  });
});
