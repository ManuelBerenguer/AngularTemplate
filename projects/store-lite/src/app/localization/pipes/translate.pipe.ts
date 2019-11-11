import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Pipe({
  name: 'translate',

  // Because the output of the translation is not only dependent of the value fed into the pipe, but also to the selected language
  pure: false
})
export class TranslatePipe implements PipeTransform {

  constructor(private translateService: TranslateService) {}

  transform(value: any, ...args: any[]) {
    return this.translateService.instant(value);
  }

}
