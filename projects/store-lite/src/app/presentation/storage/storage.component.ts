import { Component, OnChanges, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { Subscription } from 'rxjs';
import { Stats } from '../../core/models/stats.model';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';
import { BarGaugeSerie } from '../shared/bar-gauge/bar-gauge-serie';
import { Subscription } from 'rxjs';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent extends BaseComponent {

  public seriesList: BarGaugeSerie[] = new Array();

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
          this.showLoading = loading && (!this.seriesList || this.seriesList.length === 0);
        }
      ),

      this.storeLitePresentation.stats$.subscribe(
        (stats: Stats) => {
          if (stats) {
            this.getSeries(stats);
          }
        }
      )

    );

  }

  public getSeries(stats: Stats) { // : BarGaugeSerie[] {
    this.seriesList = [];

    if (stats) {

      this.seriesList.push({
        value: stats.currentAssets,
        total: stats.maxAssets,
        labelText: `${stats.currentAssets ? stats.currentAssets : ''}<br>of ${stats.maxAssets ? stats.maxAssets : ''} assets stored`,
        tooltipText: '',
        serieColor: '#ee2b37'
      });
      this.seriesList.push({
        value: stats.currentStorage,
        total: stats.maxStorage,
        labelText: `${stats.currentStorage ? stats.currentStorage : ''}Gb<br>of ${stats.maxStorage ? stats.maxStorage : ''}Gb used`,
        tooltipText: '',
        serieColor: '#e46e0c'
      });
      this.seriesList.push({
        value: stats.totalNotLive,
        total: stats.currentAssets === 0 ? 100 : stats.currentAssets,
        labelText: `${stats.totalNotLive ? stats.totalNotLive : ''}<br>Assets used on non-live parts`,
        tooltipText: '',
        serieColor: '#59cbe8'
      });
    }

  }

  /**
   * @description Reload stats data
   */
  public reloadStats(): void {
    this.storeLitePresentation.loadStats();
  }

}
