import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment as env } from 'src/environments/environment';
import { LoginResponse, User, UserProfile } from '../../models/user.model';
import {
  loadUser,
  loadUserFailure,
  loadUserSuccess,
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
  register,
  registerFailure,
  registerSuccess,
  loadUserProfile,
  loadUserProfileSuccess,
  loadUserProfileFailure,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _http: HttpClient,
    private _router: Router,
  ) {}

  register$ = createEffect(() =>
    this._actions$.pipe(
      ofType(register),
      mergeMap(({ name, email, password, password_confirmation, lang }) =>
        this._http
          .post<User>(`${env.api}/v1/auth/register`, {
            name,
            email,
            password,
            password_confirmation,
            lang,
          })
          .pipe(
            map(user => registerSuccess({ user })),
            catchError(error => of(registerFailure({ error: error.message }))),
          ),
      ),
    ),
  );
  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(login),
      mergeMap(({ email, password }) =>
        this._http
          .post<LoginResponse>(`${env.api}/v1/auth/login`, { email, password })
          .pipe(
            map(loginResponse => loginSuccess({ loginResponse })),
            catchError(error =>
              of(loginFailure({ error: error.error.message })),
            ),
          ),
      ),
    ),
  );
  logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(logout),
      mergeMap(() =>
        this._http.post(`${env.api}/v1/auth/logout`, {}).pipe(
          map(() => logoutSuccess()),
          catchError(error => of(logoutFailure({ error: error.message }))),
        ),
      ),
    ),
  );
  loadUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadUser),
      mergeMap(() =>
        this._http.get<User>(`${env.api}/v1/auth/user`).pipe(
          map(user => loadUserSuccess({ user })),
          catchError(error => of(loadUserFailure({ error: error.message }))),
        ),
      ),
    ),
  );
  loadUserProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadUserProfile),
      mergeMap(() =>
        this._http.get<UserProfile>(`${env.api}/v1/auth/user-profile`).pipe(
          map(userProfile => loadUserProfileSuccess({ userProfile })),
          catchError(error =>
            of(loadUserProfileFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
  navigateToHome$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(loginSuccess, registerSuccess),
        map(() => this._router.navigate(['/user-home'])),
      ),
    { dispatch: false },
  );
  navigateToAuth$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(logoutSuccess),
        map(() => this._router.navigate(['/'])),
      ),
    { dispatch: false },
  );
}
