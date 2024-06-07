import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cytrans',
})
export class CyTransPipe implements PipeTransform {
  transform(value: any): string {
    if (value) {
      if (typeof value === 'string') {
        return `${value}`;
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
