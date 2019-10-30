import { OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

/**
 * @description
 * Abstract class with common behavior for all components
 */

export abstract class BaseComponent implements OnInit, OnDestroy {

  // We provide an array to store all subscriptions
  protected subscriptions: Subscription;

  constructor() {
    this.subscriptions = new Subscription();
  }

  public ngOnInit(): void { }

  /**
   * @description Unsubscribes from all subscriptions to avoid memory leak
   */
  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
