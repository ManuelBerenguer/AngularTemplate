import { OnInit, OnDestroy } from '@angular/core';
import { Subscription, TeardownLogic } from 'rxjs';

/**
 * @description
 * Abstract class with common behavior for all components
 */

export abstract class BaseComponent implements OnInit, OnDestroy {

  // We provide an array to store all subscriptions
  protected subscriptions: Subscription;

  protected showLoading: boolean;
  protected showError: boolean;

  constructor() {
    this.subscriptions = new Subscription();

    this.showLoading = false;
    this.showError = false;
  }

  public ngOnInit(): void { }

  /**
   * @description Method to allow adding more than one subscription at a time
   * @param args subscriptions array
   */
  public addSubscriptions(...args: TeardownLogic[]) {
    args.forEach(item => {
      this.subscriptions.add(item);
    });
  }

  /**
   * @description Unsubscribes from all subscriptions to avoid memory leak
   */
  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
