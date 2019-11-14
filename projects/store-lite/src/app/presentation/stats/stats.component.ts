import { Component } from '@angular/core';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';
import { BaseComponent } from '../../core/base/base.component';
import { Stats } from '../../core/models/stats.model';
import { KeysConstants } from '../../core/constants/keys.constants';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent extends BaseComponent {
  // TODO solve the asset icon issue!

  public textForUnlinked: string; public textForUnresolved: string; public textForTooSmall: string; public errorText: string;

  public stats: Stats;

  constructor(public storeLitePresentation: StoreLitePresentation) {
    super();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    super.ngOnInit();

    this.addSubscriptions(

      this.storeLitePresentation.statsFailed$.subscribe(
        (failed: boolean) => {
          this.showError = failed;
        }
      ),

      this.storeLitePresentation.statsLoading$.subscribe(
        (loading: boolean) => {
            this.showLoading = loading && !this.stats;
        }
      ),

      this.storeLitePresentation.stats$.subscribe(
        (stats: Stats) => {
          if (stats) {
            this.stats = stats;
          }
        }
      ),

      this.storeLitePresentation.translateStream([KeysConstants.textForUnresolvedKey, KeysConstants.textForUnlinkedKey,
        KeysConstants.textForTooSmallKey, KeysConstants.storeStatsErrorTextKey]).subscribe(

        (res: Array<string>) => {
          this.textForUnlinked = res[KeysConstants.textForUnlinkedKey];
          this.textForUnresolved = res[KeysConstants.textForUnresolvedKey];
          this.textForTooSmall = res[KeysConstants.textForTooSmallKey];
          this.errorText = res[KeysConstants.storeStatsErrorTextKey];
        }

      )

    );

  }

  /**
   * @description Reload stats data
   */
  public reloadStats(): void {
    this.storeLitePresentation.loadStats();
  }
}
