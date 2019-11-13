import { Injectable } from "@angular/core";
import { BaseTranslateParser } from './base-translate.parser';

@Injectable()
export class ObjectNotationParser extends BaseTranslateParser {

  /**
   *
   * @param target Object with the translations
   * @param key Path to the property
   * @description Gets the value of one property in the object tree according to the path
   */
  getValue(target: object, key: string): string {
    // We split the path using dot character as separator
    const pathSplitted = key.split('.');

    /**
     * We use the reduce function to iterate acrross all subpaths and accumulate the result of accessing the property.
     * Corresponding to the subpath in an array notation.
     */
    return target && pathSplitted.reduce(
      (result, subPath) => result == null ? undefined : result[subPath],
      target
    );
  }

}
