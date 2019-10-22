import { Injectable } from '@angular/core';
import { Observable, of, Subject, Subscription, timer } from 'rxjs';
import { Stats } from '../../../core/models/stats.model';
import { AssetsRepository } from '../../../core/repositories/assets.repository';
import { AssetLinkTypeEnum } from '../../../core/enums/asset-link-type.enum';
import { UploadProgress } from '../../../core/models/upload-progress.model';

@Injectable()
export class AssetsMockStaticRepository extends AssetsRepository {

  stats$ = new Subject();

  public getStats(): Observable<Stats> {

    const testStats = new Stats();
    testStats.unlinkedAssets = 5;
    testStats.unresolvedConflicts = 3;
    testStats.tooSmallImages = 8;

    return of(testStats);
  }

  public uploadAssets(files: FileList, mode: AssetLinkTypeEnum): Observable<UploadProgress> {

    const progress = new Subject<UploadProgress>();
    const timer$ = timer(1000, 1000);
    const timerSubscription: Subscription = timer$.subscribe(tick => {

      console.log('timer', tick);
      try {
        if (Math.random() > 0.98) { // decrease here to increase the probability of error
          throw new Error('Simulate Network or API Error');
        }

        const progressVal =  10 * tick;
        progress.next(({progress: progressVal, completed: false, success: false}));

        if (progressVal >= 100) {
          progress.next(({progress: 100, completed: true, success: true}));
          progress.complete();
          timerSubscription.unsubscribe();
        }
      } catch (e) {
        progress.next(({progress: null, completed: true, success: false}));
        progress.complete();
        timerSubscription.unsubscribe();
      }

    });

    return progress.asObservable();
  }

}
