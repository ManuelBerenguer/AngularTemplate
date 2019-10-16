import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Stats } from '../../../core/models/stats.model';
import { AssetsRepository } from '../../../core/repositories/assets.repository';

@Injectable()
export class AssetsMockStaticRepository extends AssetsRepository {

  getStats(): Observable<Stats> {

    const testStats = new Stats();
    testStats.unlinkedAssets = 5;
    testStats.unresolvedConflicts = 3;
    testStats.tooSmallImages = 8;

    // return throwError('sdfsdf');

    return of(testStats);
  }

}
