import { Subject } from 'rxjs';
import { Stats } from '../models/stats.model';

export abstract class PushRepository {
  protected stats$: Subject<Stats>;
  protected signalData$: Subject<string>;

  constructor() {
    this.stats$ = new Subject<Stats>();
    this.signalData$ = new Subject<string>();
  }

  pushStats(): Subject<Stats> {
    return this.stats$;
  }

  pushGetStatsSignal(): Subject<string> {
    return this.signalData$;
  }
}
