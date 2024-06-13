import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ActivitiesComponent } from './activities/activities.component';
import { CyPipeModule } from '../pipes/pipe.module';
import { IonicModule } from '@ionic/angular';

const components = [ActivitiesComponent];
@NgModule({
  declarations: components,
  imports: [CommonModule, CyPipeModule, IonicModule],
  exports: components,
})
export class CyComponentsModule {}
