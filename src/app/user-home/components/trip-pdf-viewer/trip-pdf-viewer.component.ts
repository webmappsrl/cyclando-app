import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Trip } from 'src/app/models/user.model';

@Component({
  selector: 'app-trip-pdf-viewer',
  templateUrl: './trip-pdf-viewer.component.html',
  styleUrls: ['./trip-pdf-viewer.component.scss'],
})
export class TripPdfViewerComponent implements AfterViewInit {
  @ViewChild('pdfContainer', { static: true })
  pdfContainer!: ElementRef<HTMLDivElement>;
  @Input() trip!: Trip;

  minZoom = 0.33;
  maxZoom = 3;

  zoomLevels = [
    'auto',
    'page-actual',
    'page-fit',
    'page-width',
    0.2,
    0.25,
    0.33,
    0.5,
    0.75,
    1,
    1.25,
    1.5,
    2,
    2.5,
    3,
    3.5,
    4,
  ];
  private _zoomSetting: number | string | undefined = 'page-width';
  constructor(private _modalCtrl: ModalController) {}

  ngAfterViewInit(): void {}

  cancel(): Promise<boolean> {
    return this._modalCtrl.dismiss(null, 'cancel');
  }

  download(): void {
    if (this.trip && this.trip.route.pdf_url) {
      window.open(this.trip.route.pdf_url, '_blank');
    }
  }
  public get zoomSetting() {
    return String(this._zoomSetting);
  }
  public set zoomSetting(zoom: string) {
    if (isNaN(Number(zoom))) {
      this._zoomSetting = zoom;
    } else {
      this._zoomSetting = zoom + '%';
    }
  }
}
