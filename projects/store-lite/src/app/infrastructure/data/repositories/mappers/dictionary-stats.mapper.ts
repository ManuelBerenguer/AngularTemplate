import { Injectable } from '@angular/core';
import { Stats } from 'projects/store-lite/src/app/core/models/stats.model';
import { IDictionary, Mapper } from 'shared-lib';

@Injectable()
export class DictionaryStatsMapper extends Mapper <IDictionary<any>, Stats> {

  mapFrom(param: IDictionary<any>): Stats {
    throw new Error('Method not implemented.');
  }

  mapTo(param: IDictionary<any>): Stats {
    if (param) {
      return {
        // tooSmallImages: param['tooSmall']['value'],
        // unlinkedAssets: param['unlinked']['value'],
        // unresolvedConflicts: param['conflicts']['value']

        maxAssets: param.maxAssets,
        maxStorage: param.maxSize,
        currentAssets: param.totalAssets,
        currentStorage: param.size,
        totalNotLive: param.totalNotLive,

        tooSmallImages: param.tooSmall,
        unlinkedAssets: param.unlinked,
        unresolvedConflicts: param.conflicts
      };
    } else {
      return new Stats(); // null;  ????????
    }
  }

}
