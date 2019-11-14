import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-store-lite',
  templateUrl: './store-lite.component.html',
  styleUrls: ['./store-lite.component.scss']
})
export class StoreLiteComponent extends BaseComponent {

  constructor(public storeLitePresentation: StoreLitePresentation) {
    super();
   }

  setLang(langCode: string) {
    this.storeLitePresentation.setLang(langCode);
  }

}
