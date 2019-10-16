import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { IDictionary } from 'shared-lib';
import { PushRepository } from '../../../../core/repositories/push.repository';
import { DictionaryStatsMapper } from '../mappers/dictionary-stats.mapper';

@Injectable()
export class PushMockStaticRespository extends PushRepository {

  private every5Second: Observable<number> = timer(3000, 5000);

  private total = 1000;
  private unlinked = 5;
  private conflicts = 3;
  private tooSmall = 8;

  private ticks = 0;

  private data: IDictionary<any>;

  constructor(private statsMapper: DictionaryStatsMapper) {
    super();

    this.data = {
      // size: {value: 4.5, top: 50},
      // total: {value: this.total, top: 20000},
      // totalNotLive: {value: 20, top: this.total},
      // unlinked: {value: this.unlinked, top: this.total},
      // conflicts: {value: this.conflicts, top: this.total},
      // tooSmall: {value: this.tooSmall, top: this.total}

      maxAssets: 20000,
      maxSize: 50,

      totalAssets: this.total,
      totalImage: this.total - 100,
      total360: 10,
      totalPdf: 80,
      totalUrl: 10,

      size: 4.5,
      totalNotLive: 20,
      conflicts: this.conflicts,
      tooSmall: this.tooSmall,
      unlinked: this.unlinked,

    };

    this.timerHandler();
  }

  timerHandler() {
    this.every5Second.subscribe((seconds) => {

      this.ticks = this.ticks + 1;

      if (this.ticks % 5 === 0) {
        // console.log(seconds);
        this.signalData$.next(seconds.toString());
      } else {
        this.data.totalAssets = this.data.totalAssets + seconds;
        this.data.totalImage = this.data.totalImage + seconds;

        this.data.unlinked = this.unlinked + seconds;
        this.data.conflicts = this.conflicts + seconds;
        this.data.tooSmall = this.tooSmall + seconds;
        // console.log(this.data);
        // console.log(this.statsMapper.mapTo(this.data));
        this.stats$.next(this.statsMapper.mapTo(this.data));
      }

    });
  }

}
