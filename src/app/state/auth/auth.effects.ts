import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment as env } from 'src/environments/environment';

import { User } from '../../models/user.model';
import { loadUser, loadUserFailure, loadUserSuccess, login, loginFailure, loginSuccess, logout, logoutFailure, logoutSuccess, register, registerFailure, registerSuccess } from './auth.actions';

@Injectable()
export class AuthEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      mergeMap(() =>
        this.http.get<User>(`${env.api}/v1/auth/user`).pipe(
          map((user) => loadUserSuccess({ user })),
          catchError((error) => of(loadUserFailure({ error: error.message })))
        )
      )
    )
  );
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ email, password }) =>
        this.http.post<User>(`${env.api}/v1/auth/login`, { email, password }).pipe(
          map((user) => loginSuccess({ user })),
          catchError((error) => of(loginFailure({ error: error.message })))
        )
      )
    )
  );
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      mergeMap(() =>
        this.http.post(`${env.api}/v1/auth/logout`, {}).pipe(
          map(() => logoutSuccess()),
          catchError((error) => of(logoutFailure({ error: error.message })))
        )
      )
    )
  );
  navigateToHome$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess, registerSuccess, logoutSuccess),
        map(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap(({ email, password, name }) =>
        this.http.post<User>(`${env.api}/v1/auth/register`, { email, password, name }).pipe(
          map((user) => registerSuccess({ user })),
          catchError((error) => of(registerFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}
