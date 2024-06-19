import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TripPdfViewerComponent } from '../trip-pdf-viewer/trip-pdf-viewer.component';
import { Trip } from '../../../models/user.model';

@Component({
  selector: 'cy-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TripCardComponent {
  @Input() trip!: Trip;

  constructor(private _modalCtrl: ModalController) {}

  async openTripPdfViewer(): Promise<void> {
    const modal = await this._modalCtrl.create({
      component: TripPdfViewerComponent,
      componentProps: { trip: this.trip },
    });
    modal.present();
  }
}
