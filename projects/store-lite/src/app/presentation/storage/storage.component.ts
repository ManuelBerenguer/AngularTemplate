import { Component, OnChanges, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { Subscription } from 'rxjs';
import { Stats } from '../../core/models/stats.model';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';
import { BarGaugeSerie } from '../shared/bar-gauge/bar-gauge-serie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit, OnDestroy, OnChanges {

  private subscriptions: Subscription = new Subscription();
  public seriesList: BarGaugeSerie[] = new Array();

  constructor(public storeLitePresentation: StoreLitePresentation) {
  }

  ngOnInit() {
    this.subscriptions.add(
      this.storeLitePresentation.stats$
      .subscribe(
        (statsObj: Stats) => {
          if (statsObj) {
            this.getSeries(statsObj);
          }
        }
      )
    );
    // console.log('StorageComponent ngOnInit');
  }

  ngOnChanges(changes) {
    console.log('StorageComponent ngOnChanges', changes);
  }

  /*
   * When the component is destroyed we unsubscribe to all
   */
  ngOnDestroy() {
    console.log('StorageComponent ngOnDestroy');
    this.subscriptions.unsubscribe();
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

}
