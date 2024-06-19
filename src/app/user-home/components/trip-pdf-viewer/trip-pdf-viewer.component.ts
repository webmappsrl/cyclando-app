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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripPdfViewerComponent {
  @ViewChild(NgxExtendedPdfViewerComponent)
  private _pdfViewer!: NgxExtendedPdfViewerComponent;

  @Input() trip!: Trip;

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  maxZoom = 3;
  minZoom = 0.8;

  constructor(private _modalCtrl: ModalController) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._pdfViewer.zoom = 'page-fit';
    }, 0);
  }

  cancel(): Promise<boolean> {
    return this._modalCtrl.dismiss(null, 'cancel');
  }

  download(): void {
    if (this.trip && this.trip.route.pdf_url) {
      window.open(this.trip.route.pdf_url, '_blank');
    }
  }

  pdfLoaded(): void {
    this.loading$.next(false);
  }
}
