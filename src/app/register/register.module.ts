import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './register-routing.module';

import { RegisterPage } from './register.page';
import { CyPipeModule } from '../shared/pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    CyPipeModule,
  ],
  declarations: [RegisterPage],
})
export class RegisterPageModule {}
