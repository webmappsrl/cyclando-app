import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment as env } from 'src/environments/environment';
import { LangService } from '../../shared/services/lang.service';
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
  resendEmail,
  resendEmailSuccess,
  resendEmailFailure,
} from './auth.actions';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

const mokUserProfile: UserProfile = {
  user: {
    id: 1,
    name: 'BBBBB BBBB',
    email: 'testbbbb@gmail.com',
  },
  km_travelled: 0,
  trees_planted: 1,
  purchased_trips: [
    {
      name: 'BBBBB BBBB - Il Sud Ovest della Sardegna',
      tree_planted: false,
      from: '2024-06-17T22:00:00.000000Z',
      balance_paid: true,
      account_paid: false,
      route: {
        id: 369,
        distance: 140,
        duration: 5,
        name: {
          it: 'Il Sud Ovest della Sardegna',
          en: 'The South West of Sardinia',
        },
        price: 513,
        saleable: true,
        slug: {
          it: 'il-sud-ovest-della-sardegna',
          en: 'the-south-west-of-sardinia',
        },
        pdf_url: 'https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf',
        image_url:
          'https://becyclando.dev.cyclando.com/media/2151/conversions/sardegna-sud-ovest-nebida-ragazza-in-bicicletta-dolcevita-SF0226-thumb.webp',
        activities: [
          {
            it: 'Tour in bici',
            en: 'Bike Tours',
          },
          {
            it: 'Tour in e-bike',
            en: 'E-bike tours',
          },
        ],
        location: {
          it: 'Sardegna',
        },
        parent_location: {
          it: 'Italia',
          en: 'Italy',
        },
      },
    },
    {
      name: 'BBBBB BBBB - Il Sud Ovest della Sardegna',
      tree_planted: false,
      from: '2024-06-17T22:00:00.000000Z',
      balance_paid: true,
      account_paid: false,
      route: {
        id: 369,
        distance: 140,
        duration: 5,
        name: {
          it: 'Il Sud Ovest della Sardegna',
          en: 'The South West of Sardinia',
        },
        price: 513,
        saleable: true,
        slug: {
          it: 'il-sud-ovest-della-sardegna',
          en: 'the-south-west-of-sardinia',
        },
        pdf_url: 'https://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf',
        image_url:
          'https://becyclando.dev.cyclando.com/media/2151/conversions/sardegna-sud-ovest-nebida-ragazza-in-bicicletta-dolcevita-SF0226-thumb.webp',
        activities: [
          {
            it: 'Tour in bici',
            en: 'Bike Tours',
          },
        ],
        location: {
          it: 'Sardegna',
        },
        parent_location: {
          it: 'Italia',
          en: 'Italy',
        },
      },
    },
  ],
  favorites_count: 1,
};

@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _http: HttpClient,
    private _router: Router,
    private _toastController: ToastController,
    private _langSvc: LangService,
  ) {}

  register$ = createEffect(() =>
    this._actions$.pipe(
      ofType(register),
      mergeMap(({ name, email, password, password_confirmation, lang }) =>
        this._http
          .post<{ message: string; success: boolean }>(
            `${env.api}/v1/auth/register`,
            {
              name,
              email,
              password,
              password_confirmation,
              lang,
            },
          )
          .pipe(
            map(response => registerSuccess({ ...response, email, password })),
            catchError(error => of(registerFailure({ error: error.message }))),
          ),
      ),
    ),
  );
  resendEmail$ = createEffect(() =>
    this._actions$.pipe(
      ofType(resendEmail),
      mergeMap(({ email }) =>
        this._http
          .post<{ message: string; success: boolean }>(
            `${env.api}/v1/auth/resend/verification-email`,
            {
              email,
            },
          )
          .pipe(
            map(response => resendEmailSuccess(response)),
            catchError(error =>
              of(resendEmailFailure({ error: error.message })),
            ),
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
          catchError(error =>
            of(logoutFailure({ error: error.error.message })),
          ),
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
          catchError(error =>
            of(loadUserFailure({ error: error.error.message })),
          ),
        ),
      ),
    ),
  );
  loadUserProfile$ = createEffect(() =>
    this._actions$.pipe(
      ofType(loadUserProfile),
      mergeMap(() =>
        this._http.get<UserProfile>(`${env.api}/v1/auth/user-profile`).pipe(
          map(userProfile =>
            loadUserProfileSuccess({ userProfile: mokUserProfile }),
          ),
          catchError(error =>
            of(loadUserProfileFailure({ error: error.error.message })),
          ),
        ),
      ),
    ),
  );
  navigateToWaitEmail$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(registerSuccess),
        map(() => this._router.navigate(['/wait-email-confirm'])),
      ),
    { dispatch: false },
  );
  opneToastEmail$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(resendEmailSuccess),
        tap(async () => {
          const toast = await this._toastController.create({
            message: this._langSvc.instant('Email inviata con successo!'),
            duration: 2000,
            position: 'bottom',
          });
          await toast.present();
        }),
      ),
    { dispatch: false },
  );
  navigateToHome$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(loginSuccess, loadUserSuccess),
        map(() => this._router.navigate(['/user-home'])),
      ),
    { dispatch: false },
  );
  navigateToAuth$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(logoutSuccess, loadUserFailure),
        map(() => this._router.navigate(['/'])),
      ),
    { dispatch: false },
  );
}
