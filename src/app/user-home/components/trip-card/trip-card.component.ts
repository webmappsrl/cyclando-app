import { Component, Input, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/user.model';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent {
  @Input() trip!: Trip;
}
