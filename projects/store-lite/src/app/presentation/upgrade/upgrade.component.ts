import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { StoreLitePresentation } from '../../core/services/store-lite.presentation';
import { SystemConstants } from '../../core/constants/system.constants';
import { BaseComponent } from '../../core/base/base.component';
import { KeysConstants } from '../../core/constants/keys.constants';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent extends BaseComponent {

  public readonly graphicBulkUrl = './assets/icons/graphicBulk.svg#graphicBulk';
  public readonly graphicLimitUrl = './assets/icons/graphicLimit.svg#graphicLimit';
  public readonly graphicPublishUrl = './assets/icons/graphicPublish.svg#graphicPublish';

  public limitText: string;
  public bulkText: string;
  public publishText: string;
  public upgradeText: string;

  public readonly upgradeBtnHref: string;

  public readonly upgradeToStoreProSubject = 'Upgrading ONCE - StorePro';
  public readonly upgradeToStoreProBody = 'I\'m interested in discussing upgrading to Once - StorePro. '
  + 'Please can you contact me to discuss.';

  constructor(public storeLitePresentation: StoreLitePresentation) {
    super();
    this.upgradeBtnHref = `mailto:${storeLitePresentation.loggedUser.accountManagerEmail ?
      storeLitePresentation.loggedUser.accountManagerEmail :
      SystemConstants.supportEmail}`
      + '?subject=' + `${this.upgradeToStoreProSubject}` + '&body=' + `${this.upgradeToStoreProBody}`;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    super.ngOnInit();

    this.addSubscriptions(

      this.storeLitePresentation.translateStream([KeysConstants.upgradeLimitTextKey, KeysConstants.upgradeBulkTextKey,
        KeysConstants.upgradePublishTextKey, KeysConstants.upgradeTextKey]).subscribe(

        (res: Array<string>) => {
          this.limitText = res[KeysConstants.upgradeLimitTextKey];
          this.bulkText = res[KeysConstants.upgradeBulkTextKey];
          this.publishText = res[KeysConstants.upgradePublishTextKey];
          this.upgradeText = res[KeysConstants.upgradeTextKey];
        }

      )

    );

  }
}
