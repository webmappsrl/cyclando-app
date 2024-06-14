import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cy-wait-email-confirm',
  templateUrl: './wait-email-confirm.page.html',
  styleUrls: ['./wait-email-confirm.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class WaitEmailConfirmPage implements OnInit {
  email$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  ngOnInit(): void {
    const savedValues = localStorage.getItem('register');
    if (savedValues) {
      const parsedValues = JSON.parse(savedValues);
      this.email$.next(parsedValues.email || '');
    }
  }

  sendEmail(): void {
    //TODO: resend email confirm
  }
}
