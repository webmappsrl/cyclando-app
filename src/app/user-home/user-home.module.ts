import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserHomePageRoutingModule } from './user-home-routing.module';

import { UserHomePage } from './user-home.page';
import { TripCardComponent } from './components/trip-card/trip-card.component';
import { DistancePipe } from '../shared/pipes/distances.pipe';
import { CyTransPipe } from '../shared/pipes/cytrans.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, UserHomePageRoutingModule],
  declarations: [UserHomePage, TripCardComponent, DistancePipe, CyTransPipe],
})
export class UserHomePageModule {}
