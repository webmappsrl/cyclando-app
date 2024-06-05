import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { register } from '../state/auth/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup<any>;

  constructor(
    private _fb: FormBuilder,
    private _store: Store,
  ) {
    this.registerForm = this._fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: [
        '',
        [Validators.required, Validators.minLength(8)],
      ],
    });
  }

  onSubmit(): void {
    const registerValue = this.registerForm.value;
    if (this.registerForm.valid) {
      this._store.dispatch(
        //TODO: da controllare corrispondenza dati di registrazione con form
        register({
          ...registerValue,
          name: registerValue.name + ' ' + registerValue.surname,
          lang: 'it',
        }),
      );
    }
  }
}
