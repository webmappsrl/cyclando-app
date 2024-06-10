import { ChangeDetectorRef, Pipe } from '@angular/core';
import { LangService } from '../services/lang.service';
import { TranslatePipe } from '@ngx-translate/core';

@Pipe({
  name: 'cytrans',
  pure: false,
})
export class CyTransPipe extends TranslatePipe {
  constructor(
    private _translateSvc: LangService,
    private _cdr: ChangeDetectorRef,
  ) {
    super(_translateSvc, _cdr);
  }

  override transform(value: any): string {
    if (value) {
      if (value[this._translateSvc.currentLang]) {
        return value[this._translateSvc.currentLang];
      }
      if (value[this._translateSvc.defaultLang]) {
        return value[this._translateSvc.defaultLang];
      }
      if (typeof value === 'string') {
        return super.transform(value);
        // return `${value}`;
      }
      for (const val in value) {
        if (value[val]) {
          return `${value[val]}`;
        }
      }
    }
    return '';
  }
}
