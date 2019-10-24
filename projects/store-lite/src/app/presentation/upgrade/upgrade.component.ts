import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';
import { SystemConstants } from '../../core/constants/system.constants';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent {

  public readonly graphicBulkUrl = './assets/icons/graphicBulk.svg#graphicBulk';
  public readonly graphicLimitUrl = './assets/icons/graphicLimit.svg#graphicLimit';
  public readonly graphicPublishUrl = './assets/icons/graphicPublish.svg#graphicPublish';

  public readonly limitText = 'Are you almost at your storage limit?';
  public readonly bulkText = 'Would you rather link your images via a bulk upload?';
  public readonly publishText = 'Want to publish your assets to more places?';

  public readonly upgradeBtnText = 'Talk to us to upgrade';
  public readonly upgradeBtnHref: string;

  public readonly upgradeToStoreProSubject = 'Upgrading ONCE - StorePro';
  public readonly upgradeToStoreProBody = 'I\'m interested in discussing upgrading to Once - StorePro. '
  + 'Please can you contact me to discuss.';

  constructor(public storeLitePresentation: StoreLitePresentation) {

    this.upgradeBtnHref = `mailto:${storeLitePresentation.loggedUser.accountManagerEmail ?
      storeLitePresentation.loggedUser.accountManagerEmail :
      SystemConstants.supportEmail}`
      + '?subject=' + `${this.upgradeToStoreProSubject}` + '&body=' + `${this.upgradeToStoreProBody}`;
  }

}
