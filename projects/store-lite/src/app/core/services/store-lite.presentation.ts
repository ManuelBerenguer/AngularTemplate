import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BasePresentation, UsersRepository } from 'shared-lib';
import { Stats } from '../models/stats.model';
import { PushRepository } from '../repositories/push.repository';
import * as storeLiteStore from '../store';
import { StoreLiteState } from '../store';
import * as StatsActions from '../store/actions/stats.actions';

@Injectable()
export class StoreLitePresentation extends BasePresentation implements OnDestroy {

  public stats$ = this.storeLiteState$.select(storeLiteStore.selectStats);
  private subscritions: Subscription = new Subscription();

  constructor(
    protected usersRepository: UsersRepository,
    public storeLiteState$: Store<StoreLiteState>,
    protected serverPushRespository: PushRepository
    ) {
    super(usersRepository);

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
    this.subscritions.add(
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
    this.subscritions.add(
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

  /*
   * When the service is destroyed we unsubscribe to all ?????????
   */
  ngOnDestroy() {
    console.log('ngOnDestroy StoreLitePresentation');

    // TODO confirm that this works or find a better place to clear the subapplication store (logout, route leave)
    this.storeLiteState$.dispatch(StatsActions.clearStatsAction());

    this.subscritions.unsubscribe();
  }
}
