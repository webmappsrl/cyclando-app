import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const auth = createFeatureSelector<AuthState>('auth');
export const selectUser = createSelector(auth, state => state.user);
export const selectUserProfile = createSelector(
  auth,
  state => state.userProfile,
);
export const selectIsAuthenticated = createSelector(
  auth,
  state => state.isAuthenticated,
);
export const selectLoading = createSelector(auth, state => state.loading);
export const selectError = createSelector(auth, state => state.error);
