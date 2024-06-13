import { createAction, props } from '@ngrx/store';
import { LoginResponse, User, UserProfile } from '../../models/user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>(),
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ loginResponse: LoginResponse }>(),
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>(),
);

export const register = createAction(
  '[Auth] Register',
  props<{
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    lang: string;
  }>(),
);
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{
    message: string;
    success: boolean;
    email: string;
    password: string;
  }>(),
);
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>(),
);

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction(
  '[Auth] Logout Failure',
  props<{ error: string }>(),
);

export const loadUser = createAction('[Auth] Load User');
export const loadUserSuccess = createAction(
  '[Auth] Load User Success',
  props<{ user: User }>(),
);
export const loadUserFailure = createAction(
  '[Auth] Load User Failure',
  props<{ error: string }>(),
);

export const loadUserProfile = createAction('[Auth] Load User Profile');
export const loadUserProfileSuccess = createAction(
  '[Auth] Load User Profile Success',
  props<{ userProfile: UserProfile }>(),
);
export const loadUserProfileFailure = createAction(
  '[Auth] Load User Profile Failure',
  props<{ error: string }>(),
);
