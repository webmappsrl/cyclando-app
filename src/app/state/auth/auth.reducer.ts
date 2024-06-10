import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import {
  login,
  loginSuccess,
  loginFailure,
  register,
  registerSuccess,
  registerFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  loadUser,
  loadUserSuccess,
  loadUserFailure,
  loadUserProfile,
  loadUserProfileFailure,
  loadUserProfileSuccess,
} from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(login, register, loadUser, loadUserProfile, state => ({
    ...state,
    loading: true,
  })),
  on(loginSuccess, (state, { loginResponse }) => {
    localStorage.setItem('access_token', loginResponse.token);
    return {
      ...state,
      loginResponse,
      loading: false,
      emailConfirmed: true,
      isAuthenticated: true,
      error: undefined,
    };
  }),
  on(registerSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    emailConfirmed: false,
    isAuthenticated: true,
    error: undefined,
  })),
  on(
    loginFailure,
    registerFailure,
    loadUserFailure,
    loadUserProfileFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }),
  ),
  on(logout, state => ({ ...state, loading: true })),
  on(logoutSuccess, state => ({
    ...state,
    user: undefined,
    isAuthenticated: false,
    loading: false,
    error: undefined,
  })),
  on(logoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    isAuthenticated: true,
    error: undefined,
  })),
  on(loadUserProfileSuccess, (state, { userProfile }) => ({
    ...state,
    userProfile,
    loading: false,
    error: undefined,
  })),
);
