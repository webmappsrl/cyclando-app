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

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserProfilePage {
  userProfile$: Observable<UserProfile | undefined>;

  constructor(
    private _store: Store,
    private _utilityService: UtilityService,
  ) {
    this.userProfile$ = this._store.select(selectUserProfile);
  }

  getInitials(name: string): string {
    return this._utilityService.getInitials(name);
  }

  logout(): void {
    this._store.dispatch(logout());
  }
}
