import { Injectable, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { BasePresentation, UsersRepository, IDictionary, User, FileUtilsService } from 'shared-lib';
import { Stats } from '../models/stats.model';
import { PushRepository } from '../repositories/push.repository';
import * as storeLiteStore from '../store';
import { StoreLiteState } from '../store';
import * as StatsActions from '../store/actions/stats.actions';
import { AssetsRepository } from '../repositories/assets.repository';

@Injectable()
export class StoreLitePresentation extends BasePresentation implements OnDestroy {

  public readonly ZIP_FILE_TYPE = 'zip';
  public readonly UPLOAD_VALID_KEY = 'isValid';
  public readonly UPLOAD_NUMBER_OF_FILES_VALID_KEY = 'isNumberOfFilesValid';
  public readonly UPLOAD_FILE_TYPES_VALID_KEY = 'isFileTypesValid';

  public stats$ = this.storeLiteState$.select(storeLiteStore.selectStats);
  private subscriptions: Subscription = new Subscription();

  public loggedUser: User;

  constructor(
    protected usersRepository: UsersRepository,
    public storeLiteState$: Store<StoreLiteState>,
    protected serverPushRespository: PushRepository,
    protected fileUtilsService: FileUtilsService,
    protected assetsRepository: AssetsRepository
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
   *
   * @param files HTML input file list
   *
   * @return IDictionary specifying if we can upload or not these files and why
   */
  public async isUploadValid(files: FileList): Promise<IDictionary<any>> {

    // Result Dictionary
    const result: IDictionary<any> = {};

    // We get the files as an array
    const filesArr = Array.from(files);
    // We find out if the number of files taking into account zip files fits the restriction
    const numberOfFilesCheckResult = await this.checkNumberOfFiles(filesArr, this.loggedUser.maxAssetsPerUpload);
    result[this.UPLOAD_NUMBER_OF_FILES_VALID_KEY] = numberOfFilesCheckResult[0];
    // We check if the files fit the types allowed
    result[this.UPLOAD_FILE_TYPES_VALID_KEY] = this.fileUtilsService.areExtensionsAllowed(numberOfFilesCheckResult[1],
      this.loggedUser.allowedAssetsFilesTypesList);

    result[this.UPLOAD_VALID_KEY] = (
      result[this.UPLOAD_NUMBER_OF_FILES_VALID_KEY] &&
      result[this.UPLOAD_FILE_TYPES_VALID_KEY]
    );

    return result;
  }

  /**
   *
   * @param filesArr Array of files
   * @param maxNumberOfFiles Maximum number of files into the array
   *
   * @returns True if the total number of files into the array considering the number of files inside zip files
   * is less or equal than maxNumberOfFiles.
   * False otherwise.
   */
  private async checkNumberOfFiles(filesArr: Array<File>, maxNumberOfFiles: number): Promise<Array<any>> {
    // Result Dictionary
    const result: Array<any> = [];

    let numberOfFiles = 0;
    result[0] = true;
    result[1] = [];
    for (const file of filesArr) {
      if (this.fileUtilsService.getExtension(file) === this.ZIP_FILE_TYPE) {
        const unzipResult = await this.fileUtilsService.getZipFileNames(file);
        numberOfFiles += unzipResult.length;
        result[1].push(...unzipResult);
      } else {
        result[1].push(file.name);
        numberOfFiles++;
      }

      if (numberOfFiles > maxNumberOfFiles) {
        result[0] = false;
        break;
      }
    }

    return result;
  }

  /**
   * Upload Assets
   */
  public uploadAssets(files: FileList, mode: AssetLinkTypeEnum): Observable<{progress: number, completed: boolean, sucess: boolean}> {
    return this.assetsRepository.uploadAssets(files, mode);
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
