import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../state/auth/auth.actions';
import { selectError, selectLoading } from '../state/auth/auth.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LoginPage implements OnInit {
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
  ngOnInit(): void {
    this.loadSavedValues();
  }

  loadSavedValues(): void {
    const savedValues = localStorage.getItem('register');
    if (savedValues) {
      const parsedValues = JSON.parse(savedValues);
      this.loginForm.patchValue({
        email: parsedValues.email || '',
        password: parsedValues.password || '',
      });
      localStorage.removeItem('register');
    }
  }

  onSubmit(): void {
    const loginValue = this.loginForm.value;
    if (this.loginForm.valid) {
      this._store.dispatch(login(loginValue));
    }
  }
}
