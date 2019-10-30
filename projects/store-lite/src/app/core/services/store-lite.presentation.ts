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
   * @description Dispatch the action to get stats from server
   */
  public loadStats(): void {
    this.storeLiteState$.dispatch(StatsActions.getStatsAction());
  }

  /**
   * @description Listens to notifications from server with new stats data.
   * After each notification, it dispatches the same action we dispatch when we get the
   * stats from server so the stats will be updated in the same way.
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
   * @description Listens to notifications from server indicating new stats are available.
   * After each notification, it dispatches the action to get stats from server.
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
