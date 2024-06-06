import { Component, OnInit } from '@angular/core';
import { loadUserProfile } from '../state/auth/auth.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserProfile } from '../state/auth/auth.selector';
import { UserProfile } from '../models/user.model';
import { Router } from '@angular/router';
import { UtilityService } from '../shared/services/utility.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.page.html',
  styleUrls: ['./user-home.page.scss'],
})
export class UserHomePage implements OnInit {
  //TODO: controllo degli errori nel recuper dello user profile
  userProfile$: Observable<UserProfile | null>;

  constructor(
    private _store: Store,
    private _router: Router,
    private _utilityService: UtilityService,
  ) {
    this.userProfile$ = this._store.select(selectUserProfile);
  }

  ngOnInit(): void {
    this._store.dispatch(loadUserProfile());
  }

  getInitials(name: string): string {
    return this._utilityService.getInitials(name);
  }

  openWebpage(): void {
    //TODO: aprire il link su dispositivi mobili (?usando InAppBrowser?)
    window.open('https://cyclando.com/', '_blank');
  }

  navigateToUserProfile(): void {
    this._router.navigate(['/user-profile']);
  }
}
