import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { UtilityService } from '../shared/services/utility.service';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user.model';
import { Store } from '@ngrx/store';
import { selectUserProfile } from '../state/auth/auth.selector';
import { logout } from '../state/auth/auth.actions';
import { LangService } from '../shared/services/lang.service';

@Component({
  selector: 'cy-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserProfilePage {
  userProfile$: Observable<UserProfile | undefined>;
  alertButtons: Array<{ text: string; role: string }> = [
    {
      text: 'Annulla',
      role: 'cancel',
    },
    {
      text: 'Conferma',
      role: 'ok',
    },
  ];

  constructor(
    private _store: Store,
    private _utilitySrv: UtilityService,
    private _langSrv: LangService,
  ) {
    this.userProfile$ = this._store.select(selectUserProfile);
  }

  getInitials(name: string): string {
    return this._utilitySrv.getInitials(name);
  }

  logout(): void {
    this._store.dispatch(logout());
  }

  deleteAccountResult(ev: any): void {
    if (ev.detail.role === 'ok') {
      this._store.dispatch(logout());
      //TODO: dispatch remove account
    }
  }
}
