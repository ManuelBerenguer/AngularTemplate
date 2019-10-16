import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { BasicBarGaugeSerie } from './basic-bar-gauge-serie';

@Component({
  selector: 'app-basic-bar-gauge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic-bar-gauge.component.html',
  styleUrls: ['./basic-bar-gauge.component.scss']
})
export class BasicBarGaugeComponent implements OnInit, OnChanges {

  @Input() seriesList: BasicBarGaugeSerie[];
  seriesValues: number[] = [];
  seriesPalette: number[] = [];

  constructor() {
    this.customizeText = this.customizeText.bind(this);
   }

  ngOnInit() {
    // console.log('BasicBarGaugeComponent ngOnInit', this.seriesList);
    // this.serieListToArray();
  }

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
      this.seriesList.forEach((item: BasicBarGaugeSerie) => {
        // console.log('BasicBarGaugeComponent serieListToArray', item);
        values.push((item.value * 100) / (item.total === 0 ? item.value : item.total));
        palette.push(item.serieColor);
      });
    }

    this.seriesValues = values;
    this.seriesPalette = palette;
  }

  // devExpressObjOnInitialized(e) {
  //   // console.log(e.component);
  // }

  customizeText(arg) {
    // console.log('arg', arg);
    if (this.seriesList && this.seriesList.length > 0) {
      let serieItemIndex = 0;
      try {
        // console.log(arg.index);
        if (arg.index) {
          serieItemIndex = arg.index;
        } else if (arg.item && arg.item.index) {
          serieItemIndex = arg.item.index;
        }

      } catch (ex) {
        serieItemIndex = 0;
        // console.log(ex);
      }
      const item: BasicBarGaugeSerie = this.seriesList[serieItemIndex];
      // console.log(this.seriesList[serieItemIndex]);
      return item ? (item.labelText ? item.labelText : '') : '';
    } else {
      return '';
    }
  }

}
