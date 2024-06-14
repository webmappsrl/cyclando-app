import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaitEmailConfirmPage } from './wait-email-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: WaitEmailConfirmPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitEmailConfirmPageRoutingModule {}
