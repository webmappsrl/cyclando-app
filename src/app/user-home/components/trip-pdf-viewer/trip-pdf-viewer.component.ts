import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Trip } from '../../../models/user.model';
import { NgxExtendedPdfViewerComponent } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'cy-trip-pdf-viewer',
  templateUrl: './trip-pdf-viewer.component.html',
  styleUrls: ['./trip-pdf-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TripPdfViewerComponent {
  @ViewChild(NgxExtendedPdfViewerComponent)
  private _pdfViewer!: NgxExtendedPdfViewerComponent;
  @Input() trip!: Trip;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

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
  private _currentZoomFactor: number = 1;

  constructor(private _modalCtrl: ModalController) {}

  get zoomSetting() {
    return String(this._zoomSetting);
  }
  set zoomSetting(zoom: string) {
    if (isNaN(Number(zoom))) {
      this._zoomSetting = zoom;
    } else {
      this._zoomSetting = zoom + '%';
    }
  }

  cancel(): Promise<boolean> {
    return this._modalCtrl.dismiss(null, 'cancel');
  }

  download(): void {
    if (this.trip && this.trip.route.pdf_url) {
      window.open(this.trip.route.pdf_url, '_blank');
    }
  }

  updateZoomFactor(zoom: number): void {
    this._currentZoomFactor = zoom;
  }

  pdfLoaded(): void {
    this.loading$.next(false);
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this._pdfViewer.pdfLoadingStarts.emit(true);
  }
}
