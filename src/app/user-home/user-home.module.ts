import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserHomePageRoutingModule } from './user-home-routing.module';

import { UserHomePage } from './user-home.page';
import { TripCardComponent } from './components/trip-card/trip-card.component';
import { CyPipeModule } from '../shared/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserHomePageRoutingModule,
    CyPipeModule,
  ],
  declarations: [UserHomePage, TripCardComponent],
})
export class UserHomePageModule {}
