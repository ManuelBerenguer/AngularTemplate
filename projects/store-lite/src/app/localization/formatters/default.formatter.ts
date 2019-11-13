import { Injectable } from "@angular/core";
import { BaseTranslateFormatter } from './base-translate.formatter';

@Injectable()
export class DefaultFormatter extends BaseTranslateFormatter {

  format(target: string, ...args: string[]): string {
    return target.replace(/{(\d+)}/g, (match: any, index: number) => {
      return typeof args[index] !== 'undefined'
        ? args[index]
        : match
      ;
    });
  }

}
