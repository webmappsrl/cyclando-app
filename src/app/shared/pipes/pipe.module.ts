import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DistancePipe } from './distances.pipe';
import { CyTransPipe } from './cytrans.pipe';

const pipes = [DistancePipe, CyTransPipe];
@NgModule({
  declarations: pipes,
  imports: [CommonModule],
  exports: pipes,
})
export class CyPipeModule {}
