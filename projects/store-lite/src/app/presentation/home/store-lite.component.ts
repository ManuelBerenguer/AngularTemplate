import { Component } from '@angular/core';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';
import { BaseComponent } from '../../core/base/base.component';
import { BaseHandleStatsSignalUseCase } from '../../core/use-cases/stats/handle-stats-signal.base-usecase';

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
