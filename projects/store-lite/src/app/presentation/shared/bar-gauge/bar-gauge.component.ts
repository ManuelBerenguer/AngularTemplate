import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { BarGaugeSerie } from './bar-gauge-serie';

@Component({
  selector: 'app-bar-gauge',
  changeDetection: ChangeDetectionStrategy.OnPush, // We should use this strategy only for components that depend only on their inputs
  templateUrl: './bar-gauge.component.html',
  styleUrls: ['./bar-gauge.component.scss']
})
export class BarGaugeComponent implements OnChanges {

  @Input() seriesList: BarGaugeSerie[];
  seriesValues: number[] = [];
  seriesPalette: number[] = [];

  constructor() { }

  ngOnChanges(changes) {
    // console.log('BasicBarGaugeComponent ngOnChanges');
    if (changes.seriesList) {
      this.seriesList = changes.seriesList.currentValue;
      this.serieListToArray();
    }
  }

  serieListToArray() {
    const values = [];
    const palette = [];
    if (this.seriesList) {
      this.seriesList.forEach((item: BarGaugeSerie) => {
        // console.log('BasicBarGaugeComponent serieListToArray', item);
        values.push((item.value * 100) / (item.total === 0 ? item.value : item.total));
        palette.push(item.serieColor);
      });
    }

    this.seriesValues = values;
    this.seriesPalette = palette;
  }

}
