import { Injectable, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BasePresentation, UsersRepository, IDictionary, User } from 'shared-lib';
import { Stats } from '../models/stats.model';
import { PushRepository } from '../repositories/push.repository';
import * as storeLiteStore from '../store';
import { StoreLiteState } from '../store';
import * as StatsActions from '../store/actions/stats.actions';
import { FileUtils } from 'shared-lib';

@Injectable()
export class StoreLitePresentation extends BasePresentation implements OnDestroy {

  public ZIP_FILE_TYPE = 'zip';
  public UPLOAD_VALID_KEY = 'isValid';
  public UPLOAD_NUMBER_OF_FILES_VALID_KEY = 'isNumberOfFilesValid';
  public UPLOAD_FILE_TYPES_VALID_KEY = 'isFileTypesValid';

  public stats$ = this.storeLiteState$.select(storeLiteStore.selectStats);
  private subscriptions: Subscription = new Subscription();

  public loggedUser: User;

  constructor(
    protected usersRepository: UsersRepository,
    public storeLiteState$: Store<StoreLiteState>,
    protected serverPushRespository: PushRepository,
    protected fileUtilsService: FileUtils
    ) {
    super(usersRepository);

      // Get logged user
    this.subscribeToUser();

    this.loadStats();

    // Listen for Pushes
    this.listenPushStats();
    this.listenPushGetStatsSignal();
  }

  /**
   * Loads stats
   */
  public loadStats(): void {
    this.storeLiteState$.dispatch(StatsActions.getStatsAction());
  }

  /**
   * Push stats
   */
  private listenPushStats(): void {
    this.subscriptions.add(
      this.serverPushRespository.pushStats()
      .subscribe(
        (statsObj: Stats) => {
          if (statsObj) {
            this.storeLiteState$.dispatch(StatsActions.getStatsSuccessAction({stats: statsObj}));
          }
        }
      )
    );
  }

  /**
   * Push get stats signal
   */
  private listenPushGetStatsSignal(): void {
    this.subscriptions.add(
      this.serverPushRespository.pushGetStatsSignal()
      .subscribe(
        (signalData: string) => {
          if (signalData) {
            this.loadStats();
          }
        }
      )
    );
  }

  private subscribeToUser() {

    this.subscriptions.add(
      this.loggedUser$.subscribe(
        (user: User) => {
          this.loggedUser = user;
        }
      )
    );

  }

  /*
   * When the service is destroyed we unsubscribe to all ?????????
   */
  ngOnDestroy() {
    console.log('ngOnDestroy StoreLitePresentation');

    // TODO confirm that this works or find a better place to clear the subapplication store (logout, route leave)
    this.storeLiteState$.dispatch(StatsActions.clearStatsAction());

    this.subscriptions.unsubscribe();
  }

   async isUploadValid(files: FileList): Promise<IDictionary<any>> {
    const result: IDictionary<any> = {};

    result[this.UPLOAD_FILE_TYPES_VALID_KEY] = false;

    const filesArr = Array.from(files);
    let numFilesOk: boolean = filesArr && filesArr.length <= this.loggedUser.maxAssetsPerUpload;

    if(numFilesOk){
      let numberOfFiles = 0;

      for(let i=0; i<filesArr.length; i++) {
        let file = filesArr[i];
        if(this.fileUtilsService.getExtension(file) == this.ZIP_FILE_TYPE) {
          let unzipResult = await this.fileUtilsService.getZipFileNames(file);
          numberOfFiles += unzipResult.length;
        }
        else {
          numberOfFiles++;
        }
      }

      numFilesOk = numberOfFiles <= this.loggedUser.maxAssetsPerUpload;


    }

    result[this.UPLOAD_NUMBER_OF_FILES_VALID_KEY] = numFilesOk;

    result[this.UPLOAD_VALID_KEY] = numFilesOk;

    return result;
  }
}
