import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserHomePageRoutingModule } from './user-home-routing.module';

import { UserHomePage } from './user-home.page';
import { TripCardComponent } from './components/trip-card/trip-card.component';
import { CyPipeModule } from '../shared/pipes/pipe.module';
import { TripPdfViewerComponent } from './components/trip-pdf-viewer/trip-pdf-viewer.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserHomePageRoutingModule,
    CyPipeModule,
    NgxExtendedPdfViewerModule,
  ],
  declarations: [UserHomePage, TripCardComponent, TripPdfViewerComponent],
})
export class UserHomePageModule {}
