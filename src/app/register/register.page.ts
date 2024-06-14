import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../state/auth/auth.actions';
import { stringMatchValidator } from '../shared/validators/string-match.validators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cy-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RegisterPage {
  registerForm: FormGroup<any>;
  submitted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private _fb: FormBuilder,
    private _store: Store,
  ) {
    this.registerForm = this._fb.group(
      {
        privacy: [false, Validators.requiredTrue],
        name: ['', [Validators.required]],
        surname: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: [
          '',
          [Validators.required, Validators.minLength(8)],
        ],
      },
      { validators: stringMatchValidator('password', 'password_confirmation') },
    );
  }

  openPrivacyPolicy(): void {
    window.open('https://www.iubenda.com/privacy-policy/61944105', '_blank');
  }

  onSubmit(): void {
    this.submitted$.next(true);
    const registerValue = this.registerForm.value;
    if (this.registerForm.valid) {
      this._store.dispatch(
        register({
          ...registerValue,
          name: `${registerValue.name} ${registerValue.surname}`,
          lang: 'it',
        }),
      );
    }
  }
}
