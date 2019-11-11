import { Component, OnChanges, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { Subscription } from 'rxjs';
import { Stats } from '../../core/models/stats.model';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';
import { BarGaugeSerie } from '../shared/bar-gauge/bar-gauge-serie';
import { Subscription } from 'rxjs';
import { BaseComponent } from '../../core/base/base.component';
import { doesNotThrow } from 'assert';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.scss']
})
export class StorageComponent extends BaseComponent {

  public readonly errorText = 'Problem loading Storage';
  public tooltipText1 = '';

  public stats: Stats;
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
            this.stats = stats;
            this.getSeries(stats);
          }
        }
      ),

      this.storeLitePresentation.translateStream('storeLite.storage.tooltip1').subscribe(
        (res: any) => {
          this.tooltipText1 = res;
          this.getSeries(this.stats);
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
        labelText: this.storeLitePresentation.translate('storeLite.storage.legend1', (stats.maxAssets ? stats.maxAssets.toString() : '')),
        tooltipText: 'Contact your BDM about upgrading to more storage.',
        serieColor: '#ee2b37'
      });
      this.seriesList.push({
        value: stats.currentStorage,
        total: stats.maxStorage,
        labelText: `of ${stats.maxStorage ? stats.maxStorage : ''}Gb used`,
        tooltipText: `<table>
        <tr><td align="right">${stats.numberOfImages}</td><td>&nbsp;</td><td><b>Images</b></td></tr>
        <tr><td align="right">${stats.numberOfPdf}</td><td>&nbsp;</td><td><b>PDFs</b></td></tr>
        <tr><td align="right">${stats.numberOfUrl}</td><td>&nbsp;</td><td><b>Url</b></td></tr>
        <tr><td align="right">${stats.numberOf360}</td><td>&nbsp;</td><td><b>360</b></td></tr>
        </table>`,
        serieColor: '#e46e0c'
      });
      this.seriesList.push({
        value: stats.totalNotLive,
        total: stats.currentAssets === 0 ? 100 : stats.currentAssets,
        labelText: `Assets used on non-live parts`,
        tooltipText: 'Seleted;Superseded',
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
