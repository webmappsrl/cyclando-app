import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Trip } from 'src/app/models/user.model';
import { TripPdfViewerComponent } from '../trip-pdf-viewer/trip-pdf-viewer.component';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
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
