import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
    if ('access_token' in localStorage) this._router.navigate(['/user-home']);
  }
}
