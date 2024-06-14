import { Pipe, PipeTransform } from '@angular/core';
import {
  format as fm,
  isSameDay,
  isSameMonth,
  isSameYear,
  addDays,
} from 'date-fns';
import { it as itLocale } from 'date-fns/locale';
import { LangService } from '../services/lang.service';

@Pipe({
  name: 'dateRange',
})
export class DateRangePipe implements PipeTransform {
  private _lang = this._langSvc.currentLang;
  constructor(private _langSvc: LangService) {}

  transform(startDate: string, days: number = 0): string {
    const endDate: Date = this._calculateEndDate(startDate, days);
    const startDateFormatted: string = this._formatDate(
      startDate,
      'd MMMM yyyy',
    );
    const endDateFormatted: string = this._formatDate(endDate, 'd MMMM yyyy');

    let result: string;

    if (!isSameYear(new Date(startDate), endDate)) {
      // Caso: giorno, mese e anno diversi
      result = `${startDateFormatted} - ${endDateFormatted}`;
    } else if (!isSameMonth(new Date(startDate), endDate)) {
      // Caso: giorno e mese diversi
      result = `${this._formatDate(startDate, 'd MMMM')} - ${endDateFormatted}`;
    } else if (!isSameDay(new Date(startDate), endDate)) {
      // Caso: solo giorno diverso
      result = `${this._formatDate(startDate, 'd')} - ${endDateFormatted}`;
    } else {
      // Caso: stesso giorno, mese e anno
      result = `${startDateFormatted}`;
    }

    return result;
  }

  private _formatDate(date: string | Date, format: string): string {
    // Impostiamo la localizzazione qui tramite le opzioni di formato
    return fm(new Date(date), format, { locale: itLocale });
  }

  private _calculateEndDate(startDate: string, days: number): Date {
    return addDays(new Date(startDate), days - 1);
  }
}
