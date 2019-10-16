import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';

@Component({
  selector: 'app-stats',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy {


  // TODO solve the asset icon issue!

  public textForUnlinked = 'Assets are unlinked';
  public textForUnresolved = 'Unresolved conflicts';
  public textForTooSmall = 'Assets are too small';

  constructor(public storeLitePresentation: StoreLitePresentation) { }

  ngOnInit() {
  }

  /*
   * When the component is destroyed we unsubscribe to all
   */
  ngOnDestroy() {
  }

}
