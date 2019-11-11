import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of, concat } from 'rxjs';
import { isDefined } from '../utils/utils';
import { switchMap } from 'rxjs/operators';

export interface LangChangeEvent {
  lang: string;
}

@Injectable()
export class TranslateService {

  // The default lang
  private _defaultLang: string;

  // The lang currently used
  private _currentLang: string;

  private _onLangChange: EventEmitter<LangChangeEvent> = new EventEmitter<LangChangeEvent>();

  // this will contain all the strings in hierarchical a.b... structure
  private translations: any = null;

  constructor(private httpCli: HttpClient) { }

  /**
   * The default lang to fallback when translations are missing on the current lang
   */
  get defaultLang(): string {
    return this._defaultLang;
  }

  set defaultLang(defaultLang: string) {
    this._defaultLang = defaultLang;
  }

  /**
   * The lang currently used
   */
  get currentLang(): string {
    return this._currentLang;
  }

  set currentLang(currentLang: string) {
    this._currentLang = currentLang;
  }

  /**
   * An EventEmitter to listen to lang change events
   * onLangChange.subscribe((params: LangChangeEvent) => {
   *     // do something
   * });
   */
  get onLangChange(): EventEmitter<LangChangeEvent> {
    return this._onLangChange;
  }

  /**
   *
   * @param lang the locale code to use as localization
   * @description Gets the correct json file with translations in function of the locale code. It returns a promise.
   */
  use(lang: string): Promise<{}> {

    return new Promise<{}>((resolve, reject) => {

      // Path to the language resource file
      const langPath = `assets/i18n/${lang || 'en'}.json`;

      this.httpCli.get(langPath).subscribe(
        txs => {
          this.translations = Object.assign({}, txs || {});
          this.onLangChange.emit({lang});
          resolve(true);
        },
        error => {
          this.translations = {};
          resolve(false);
        }
      );

    });

  }

  /**
   *
   * @param toTranslate The key to get translation from
   * @description
   * Returns the translation corresponding to the parameter key and in function of current localization.
   * If key doesn't exist returns 'Translation Missed' string.
   */
  instant(toTranslate: string, ...args: string[]): string {
    let got = this.get(toTranslate);
    if (!got) {
      got = 'Translation Missed';
    }

    return got;
  }

  /**
   *
   * @param path to the property
   * @description Gets the value of one property in the object tree according to the path
   */
  private get(path: string): any {

    // We split the path using dot character as separator
    const pathSplitted = path.split('.');

    /**
     * We use the reduce function to iterate acrross all subpaths and accumulate the result of accessing the property.
     * Corresponding to the subpath in an array notation.
     */
    return this.translations && pathSplitted.reduce(
      (result, subPath) => result == null ? undefined : result[subPath],
      this.translations
    );
  }

  /**
   * Gets the translated value of a key (or an array of keys)
   * @returns the translated key, or an object of translated keys
   */
  public getTranslation(key: string): Observable<string | any> {
    if (!isDefined(key) || !key.length) {
      throw new Error(`Parameter "key" required`);
    }

    const translation = this.get(key);

    return of(translation);
  }

  /**
   * Returns a stream of translated values of a key (or an array of keys) which updates
   * whenever the language changes.
   * @returns A stream of the translated key, or an object of translated keys
   */
  public stream(key: string): Observable<string | any> {
    if (!isDefined(key) || !key.length) {
      throw new Error(`Parameter "key" required`);
    }

    return concat(
      this.getTranslation(key),
      this.onLangChange.pipe(
        switchMap((event: LangChangeEvent) => {
          return this.getTranslation(key);
        })
      ));
  }
}
