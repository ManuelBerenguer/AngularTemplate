import { BaseHandleStatsSignalUseCase } from './handle-stats-signal.base-usecase';
import { PushRepository } from '../../repositories/push.repository';
import { Stats } from '../../models/stats.model';
import { Store } from '@ngrx/store';
import { StoreLiteState } from '../../store';
import * as StatsActions from '../../store/actions/stats.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class HandleStatsSignalUseCase extends BaseHandleStatsSignalUseCase {

  constructor(private pushRepository: PushRepository, private storeLiteState$: Store<StoreLiteState>) {
    super();
  }

  execute(): void {

    /**
     * @description Listens to notifications from server with new stats data.
     * After each notification, it dispatches the same action we dispatch when we get the
     * stats from server so the stats will be updated in the same way.
     */
    this.pushRepository.pushStats()
      .subscribe(
        (statsObj: Stats) => {
          if (statsObj) {
            this.storeLiteState$.dispatch(StatsActions.getStatsSuccessAction({stats: statsObj}));
          }
        }
      );

    /**
     * @description Listens to notifications from server indicating new stats are available.
     * After each notification, it dispatches the action to get stats from server.
     */
    this.pushRepository.pushGetStatsSignal()
      .subscribe(
        (signalData: string) => {
          if (signalData) {
            this.storeLiteState$.dispatch(StatsActions.getStatsAction());
          }
        }
      );
  }
}
