import { Injectable } from '@angular/core';
import { Observable, of, Subject, timer } from 'rxjs';
import { Stats } from '../../../core/models/stats.model';
import { AssetsRepository } from '../../../core/repositories/assets.repository';

@Injectable()
export class AssetsMockStaticRepository extends AssetsRepository {

  private every1Second: Observable<number> = timer(1000, 1000);
  private ticks = 0;

  private progress: Subject<number>;

  public getStats(): Observable<Stats> {

    const testStats = new Stats();
    testStats.unlinkedAssets = 5;
    testStats.unresolvedConflicts = 3;
    testStats.tooSmallImages = 8;

    // return throwError('sdfsdf');

    return of(testStats);
  }


  public uploadAssets(files: FileList): Observable<any> {

    this.progress = new Subject<number>();
    this.timerHandler();


    // return the map of progress.observables
    return this.progress.asObservable();
  }

  timerHandler() {
    this.every1Second.subscribe((seconds) => {

      if (this.ticks > 0) {
        let progressVal = 0;
        progressVal =  progressVal + 10;
        this.progress.next(progressVal);

        if (progressVal === 100) {
          this.progress.complete();
          return;
        }

      }

      this.ticks = this.ticks + 1;

    });
  }

}
