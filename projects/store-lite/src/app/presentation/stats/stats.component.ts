import { Component } from '@angular/core';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';
import { BaseComponent } from '../../core/base/base.component';
import { Stats } from '../../core/models/stats.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent extends BaseComponent {
  // TODO solve the asset icon issue!

  public readonly textForUnlinked = 'Assets are unlinked';
  public readonly textForUnresolved = 'Unresolved conflicts';
  public readonly textForTooSmall = 'Assets are too small';

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
