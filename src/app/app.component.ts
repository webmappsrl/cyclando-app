import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUser } from './state/auth/auth.actions';

@Component({
  selector: 'cy-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _store: Store) {}

  ngOnInit(): void {
    this._store.dispatch(loadUser());
  }
}
