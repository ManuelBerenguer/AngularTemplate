import { Injectable } from '@angular/core';
import { Observable, of, Subject, Subscription, timer } from 'rxjs';
import { Stats } from '../../../core/models/stats.model';
import { AssetsRepository } from '../../../core/repositories/assets.repository';

@Injectable()
export class AssetsMockStaticRepository extends AssetsRepository {

  private progress: Subject<{progress: number, completed: boolean, sucess: boolean}>;

  public getStats(): Observable<Stats> {

    const testStats = new Stats();
    testStats.unlinkedAssets = 5;
    testStats.unresolvedConflicts = 3;
    testStats.tooSmallImages = 8;

    // return throwError('sdfsdf');

    return of(testStats);
  }


  public uploadAssets(files: FileList, mode: any): Observable<{progress: number, completed: boolean, sucess: boolean}> {

    this.progress = new Subject<{progress: number, completed: boolean, sucess: boolean}>();
    const timer$ = timer(1000, 1000);
    const timerSubscription: Subscription = timer$.subscribe(tick => {

      console.log('timer', tick);
      try {
        if (Math.random() > 0.98) { // decrease here to increase the probability of error
          throw new Error('Simulate Network or API Error');
        }

        const progressVal =  10 * tick;
        this.progress.next(({progress: progressVal, completed: false, sucess: false}));

        if (progressVal >= 100) {
          this.progress.next(({progress: 100, completed: true, sucess: true}));
          this.progress.complete();
          timerSubscription.unsubscribe();
        }
      } catch (e) {
        this.progress.next(({progress: null, completed: true, sucess: false}));
        this.progress.complete();
        timerSubscription.unsubscribe();
      }

    });

    // return the map of progress.observables
    return this.progress.asObservable();
  }

}
