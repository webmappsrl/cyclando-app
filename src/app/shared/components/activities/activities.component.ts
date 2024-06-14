import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { TripRouteActivity } from 'src/app/models/user.model';
import { LangService } from '../../services/lang.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'cy-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ActivitiesComponent {
  @Input() activities: TripRouteActivity[] = [];
  @ViewChild('popover') popover!: any;
  isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private _languageSvc: LangService) {}

  private activityIcons: { [key: string]: string } = {
    'tour in bici': 'assets/icon/svgs/bike-icon.svg',
    'bike tours': 'assets/icon/svgs/bike-icon.svg',
    'tour in bici da corsa': 'assets/icon/svgs/bike-icon.svg',
    'road cycling holidays': 'assets/icon/svgs/bike-icon.svg',
    'tour in bici e barca': 'assets/icon/svgs/bike-icon.svg',
    'bike and boat tour': 'assets/icon/svgs/bike-icon.svg',
    'tour in e-bike': 'assets/icon/svgs/ebike-icon.svg',
    'e-bike tours': 'assets/icon/svgs/ebike-icon.svg',
    'tour in bici gravel': 'assets/icon/svgs/bike-icon.svg',
    'gravel bike tour': 'assets/icon/svgs/bike-icon.svg',
    'tour in mtb': 'assets/icon/svgs/mountain-bike-icon.svg',
    'mtb cycling holidays': 'assets/icon/svgs/mountain-bike-icon.svg',
  };

  getIcon(activity: TripRouteActivity): string {
    const lang: keyof TripRouteActivity =
      (this._languageSvc.currentLang as keyof TripRouteActivity) ||
      (this._languageSvc.defaultLang as keyof TripRouteActivity) ||
      'it';
    const activityName: string = activity[lang] || '';
    return this.activityIcons[activityName.toLowerCase()] || '';
  }

  presentPopover(e: Event): void {
    this.popover.event = e;
    this.isOpen$.next(true);
  }
}
