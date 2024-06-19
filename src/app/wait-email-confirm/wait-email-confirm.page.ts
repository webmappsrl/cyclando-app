import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { resendEmail } from '../state/auth/auth.actions';
import { selectLoading } from '../state/auth/auth.selector';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'cy-wait-email-confirm',
  templateUrl: './wait-email-confirm.page.html',
  styleUrls: ['./wait-email-confirm.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class WaitEmailConfirmPage implements OnInit {
  loading$: Observable<boolean> = this._store.select(selectLoading);
  email$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private _store: Store,
    private _navCtrl: NavController,
  ) {}

  ngOnInit(): void {
    const savedValues = localStorage.getItem('register');
    if (savedValues) {
      const parsedValues = JSON.parse(savedValues);
      this.email$.next(parsedValues.email || '');
    }
  }

  sendEmail(): void {
    this._store.dispatch(resendEmail({ email: this.email$.value }));
  }

  navigateToLogin(): void {
    this._navCtrl.navigateRoot('/login');
  }
}
