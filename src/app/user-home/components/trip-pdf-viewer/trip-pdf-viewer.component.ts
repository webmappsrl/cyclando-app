import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Trip } from '../../../models/user.model';
import { NgxExtendedPdfViewerComponent } from 'ngx-extended-pdf-viewer';
import { LangService } from '../../../shared/services/lang.service';
import { Share } from '@capacitor/share';

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

  constructor(
    private _modalCtrl: ModalController,
    private _langSvc: LangService,
  ) {}

  ngAfterViewInit(): void {
    this._pdfViewer.zoom = 'page-fit';
  }

  cancel(): Promise<boolean> {
    return this._modalCtrl.dismiss(null, 'cancel');
  }

  async download(): Promise<void> {
    console.log('share');
    await Share.share({
      title: this._langSvc.instant(
        this.trip.route.name as { [lang: string]: string },
      ),
      dialogTitle: this._langSvc.instant(
        this.trip.route.name as { [lang: string]: string },
      ),
      text: this._langSvc.instant('Questo è il mio viaggio con Cyclando!'),
      url: this.trip.route.pdf_url,
    });
  }

  pdfLoaded(): void {
    this.loading$.next(false);
  }
}
