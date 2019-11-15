import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BasePresentation, User, UsersRepository } from 'shared-lib';
import { TranslateService } from '../../localization/services/translate.service';
import { AssetLinkTypeEnum } from '../enums/asset-link-type.enum';
import * as storeLiteStore from '../store';
import { StoreLiteState } from '../store';
import * as FileUploadActions from '../store/actions/file-upload.actions';
import * as StatsActions from '../store/actions/stats.actions';

@Injectable()
export class StoreLitePresentation extends BasePresentation implements OnDestroy {

  // Stats observables
  public stats$ = this.storeLiteState$.select(storeLiteStore.selectStats);
  public statsReady$ = this.storeLiteState$.select(storeLiteStore.selectStatsReady);
  public statsLoading$ = this.storeLiteState$.select(storeLiteStore.selectStatsLoading);
  public statsFailed$ = this.storeLiteState$.select(storeLiteStore.selectStatsFailed);
  public statsLoaded$ = this.storeLiteState$.select(storeLiteStore.selectStatsLoaded);
  public statsError$ = this.storeLiteState$.select(storeLiteStore.selectError);

  // Files upload observables
  public filesUploadChecking$ = this.storeLiteState$.select(storeLiteStore.selectUploadFilesChecking);
  public filesUploadUploading$ = this.storeLiteState$.select(storeLiteStore.selectUploadFilesUploading);
  public filesUploadProgress$ = this.storeLiteState$.select(storeLiteStore.selectUploadFilesProgress);
  public filesUploadError$ = this.storeLiteState$.select(storeLiteStore.selectUploadFilesError);
  public filesUploadSuccess$ = this.storeLiteState$.select(storeLiteStore.selectUploadFilesCompleted);
  public filesUploadReady$ = this.storeLiteState$.select(storeLiteStore.selectUploadFilesReady);

  private subscriptions: Subscription = new Subscription();

  public loggedUser: User;

  constructor(
    protected usersRepository: UsersRepository,
    public storeLiteState$: Store<StoreLiteState>,
    private translateService: TranslateService
    ) {
    super(usersRepository);

    // Get logged user
    this.subscribeToUser();

    this.loadStats();
  }

  /**
   *
   * @param key Key to translate
   * @param ...args Array with values for replace the translated text placeholders
   * @description Translates a key to the corresponding text
   */
  public translate(key: string, ...args: string[]): string {
    return this.translateService.instant(key, ...args)/*.format(...args)*/;
  }

  public translateStream(key: string | Array<string>, ...args: string[][]): Observable<string | Array<string>> {
    return this.translateService.stream(key, args);
  }

  public onLangChanges() {
    return this.translateService.onLanguageChange;
  }

  public setLang(langCode: string): void {
    this.translateService.use(langCode).then(
      (result: boolean) => {
        if (result) {
        }
      }
    );
  }

  /**
   * @description Dispatch the action to get stats from server
   */
  public loadStats(): void {
    this.storeLiteState$.dispatch(StatsActions.getStatsAction());
  }

  /**
   * @description It subscribes to user observable and updates the internal user object
   * everytime the observable emits a new value for user
   */
  private subscribeToUser() {
    this.subscriptions.add(
      this.loggedUser$.subscribe(
        (user: User) => {
          this.loggedUser = user;
        }
      )
    );
  }

  /**
   * @description
   * Triggers the initial action corresponding to the upload files process
   */
  public uploadAssets(filesList: FileList, mode: AssetLinkTypeEnum): void {
    this.storeLiteState$.dispatch(FileUploadActions.getDoChecksAction({
      files: filesList,
      maxNumberOfFiles: this.loggedUser.maxAssetsPerUpload,
      fileTypesList: this.loggedUser.allowedAssetsFilesTypesList,
      mode
    }));
  }

  /**
   * @description When the service is destroyed we unsubscribe to all the subscriptions done previously
   */
  ngOnDestroy() {
    console.log('ngOnDestroy StoreLitePresentation');

    // TODO confirm that this works or find a better place to clear the subapplication store (logout, route leave)
    this.storeLiteState$.dispatch(StatsActions.getClearStatsAction());

    this.subscriptions.unsubscribe();
  }
}

declare global {
  interface String {
    format(...replacements: string[]): string;
  }
}

if (!String.prototype.format) {
  String.prototype.format = function() {
    const args = arguments;
    return this.replace(/{(\d+)}/g, (match: any, index: number) => {
      return typeof args[index] !== 'undefined'
        ? args[index]
        : match
      ;
    });
  };
}
