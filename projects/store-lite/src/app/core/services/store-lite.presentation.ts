import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BasePresentation, User, UsersRepository } from 'shared-lib';
import { AssetLinkTypeEnum } from '../enums/asset-link-type.enum';
import { Stats } from '../models/stats.model';
import { PushRepository } from '../repositories/push.repository';
import * as storeLiteStore from '../store';
import { StoreLiteState } from '../store';
import * as StatsActions from '../store/actions/stats.actions';
import * as FileUploadActions from '../store/actions/file-upload.actions';

@Injectable()
export class StoreLitePresentation extends BasePresentation implements OnDestroy {

  public stats$ = this.storeLiteState$.select(storeLiteStore.selectStats);
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
    protected serverPushRespository: PushRepository
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

  /*
   * When the service is destroyed we unsubscribe to all ?????????
   */
  ngOnDestroy() {
    console.log('ngOnDestroy StoreLitePresentation');

    // TODO confirm that this works or find a better place to clear the subapplication store (logout, route leave)
    this.storeLiteState$.dispatch(StatsActions.clearStatsAction());

    this.subscriptions.unsubscribe();
  }
}
