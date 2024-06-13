import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitEmailConfirmPageRoutingModule } from './wait-email-confirm-routing.module';

import { WaitEmailConfirmPage } from './wait-email-confirm.page';
import { CyPipeModule } from '../shared/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitEmailConfirmPageRoutingModule,
    CyPipeModule,
  ],
  declarations: [WaitEmailConfirmPage],
})
export class WaitEmailConfirmPageModule {}
