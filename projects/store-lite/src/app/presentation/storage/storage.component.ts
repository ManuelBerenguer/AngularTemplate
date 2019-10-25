import { Component, OnChanges, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { Subscription } from 'rxjs';
import { Stats } from '../../core/models/stats.model';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';
import { BarGaugeSerie } from '../shared/bar-gauge/bar-gauge-serie';

@Component({
  selector: 'app-storage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent implements OnInit, OnDestroy, OnChanges {

  // private subscritions: Subscription = new Subscription();
  public seriesList: BarGaugeSerie[];

  constructor(public storeLitePresentation: StoreLitePresentation) {
  }

  ngOnInit() {
    console.log('StorageComponent ngOnInit');
  }

  ngOnChanges(changes) {
    console.log('StorageComponent ngOnChanges', changes);
  }

  /*
   * When the component is destroyed we unsubscribe to all
   */
  ngOnDestroy() {
    console.log('StorageComponent ngOnDestroy');
  }

  public getSeries(stats: Stats): BarGaugeSerie[] {
    const resultSeriesList: BarGaugeSerie[] = [];

    if (stats) {

      resultSeriesList.push({
        value: stats.currentAssets,
        total: stats.maxAssets,
        labelText: `${stats.currentAssets ? stats.currentAssets : ''}<br>of ${stats.maxAssets ? stats.maxAssets : ''} assets stored`,
        tooltipText: '',
        serieColor: '#ee2b37'
      });
      resultSeriesList.push({
        value: stats.currentStorage,
        total: stats.maxStorage,
        labelText: `${stats.currentStorage ? stats.currentStorage : ''}Gb<br>of ${stats.maxStorage ? stats.maxStorage : ''}Gb used`,
        tooltipText: '',
        serieColor: '#e46e0c'
      });
      resultSeriesList.push({
        value: stats.totalNotLive,
        total: stats.currentAssets === 0 ? 100 : stats.currentAssets,
        labelText: `${stats.totalNotLive ? stats.totalNotLive : ''}<br>Assets used on non-live parts`,
        tooltipText: '',
        serieColor: '#59cbe8'
      });
    }

    console.log('StorageComponent seriesList2', this.seriesList);
    return resultSeriesList;
  }

}
