import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../state/auth/auth.actions';
import { selectError, selectLoading } from '../state/auth/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup<any>;
  // osservabili con $
  loading$: Observable<boolean> = this._store.select(selectLoading);
  error$: Observable<string | undefined> = this._store.select(selectError);

  constructor(
    private _fb: FormBuilder,
    private _store: Store,
  ) {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    const loginValue = this.loginForm.value;
    if (this.loginForm.valid) {
      this._store.dispatch(login(loginValue));
    }
  }
}
