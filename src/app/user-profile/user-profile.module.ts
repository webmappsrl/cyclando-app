import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserProfilePageRoutingModule } from './user-profile-routing.module';

import { UserProfilePage } from './user-profile.page';
import { CyPipeModule } from '../shared/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserProfilePageRoutingModule,
    CyPipeModule,
  ],
  declarations: [UserProfilePage],
})
export class UserProfilePageModule {}
