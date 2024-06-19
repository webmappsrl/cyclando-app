import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { loadUserProfile } from '../state/auth/auth.actions';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectLoading, selectUserProfile } from '../state/auth/auth.selector';
import { UserProfile } from '../models/user.model';
import { Router } from '@angular/router';
import { UtilityService } from '../shared/services/utility.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'cy-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserHomePage implements OnInit {
  userProfile$: Observable<UserProfile | undefined>;
  loading$: Observable<boolean> = this._store.select(selectLoading);
  _backBtnSub$: Subscription = Subscription.EMPTY;

  constructor(
    private _store: Store,
    private _router: Router,
    private _platform: Platform,
    private _utilityService: UtilityService,
  ) {
    this.userProfile$ = this._store.select(selectUserProfile);
  }

  ngOnInit(): void {
    this._store.dispatch(loadUserProfile());
  }

  ionViewDidEnter(): void {
    this._backBtnSub$ = this._platform.backButton.subscribeWithPriority(
      99999,
      () => {
        console.log('Non faccio niente pappappero');
      },
    );
  }

  ionViewWillLeave(): void {
    this._backBtnSub$.unsubscribe();
  }

  getInitials(name: string): string {
    return this._utilityService.getInitials(name);
  }

  openWebpage(): void {
    window.open('https://cyclando.com/', '_blank');
  }

  navigateToUserProfile(): void {
    this._router.navigate(['/user-profile']);
  }
}
