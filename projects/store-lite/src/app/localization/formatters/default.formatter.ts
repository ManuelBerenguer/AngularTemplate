import { Injectable } from "@angular/core";
import { BaseTranslateFormatter } from './base-translate.formatter';
import { isDefined } from '@angular/compiler/src/util';

@Injectable()
export class DefaultFormatter extends BaseTranslateFormatter {

  format(target: string, args: string[]): string {

    if (!isDefined(args) || !isDefined(target)) {
      return target;
    }

    return target.replace(/{(\d+)}/g, (match: any, index: number) => {
      return typeof args[index] !== 'undefined'
        ? args[index]
        : match
      ;
    });
  }

}
