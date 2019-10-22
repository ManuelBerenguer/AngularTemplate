import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';

@Component({
  selector: 'app-store-lite',
  templateUrl: './store-lite.component.html',
  styleUrls: ['./store-lite.component.scss']
})
export class StoreLiteComponent implements OnInit, OnDestroy {

  constructor(public storeLitePresentation: StoreLitePresentation) { }

  ngOnInit() {
  }

  /*
   * When the component is destroyed we unsubscribe to all
   */
  ngOnDestroy() {
  }

}
