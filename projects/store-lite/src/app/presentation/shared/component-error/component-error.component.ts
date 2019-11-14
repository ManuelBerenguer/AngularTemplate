import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-component-error',
  templateUrl: './component-error.component.html',
  styleUrls: ['./component-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // We should use this strategy only for components that depend only on their inputs
})
export class ComponentErrorComponent {

  constructor() { }

  // The text to be displayed
  @Input() public text: string;

  // To emit an event to the parent to inform we want to retry
  @Output() public tryAgainEmitter = new EventEmitter();

  /**
   * @description It will use the event emitter to inform the parent to try again
   */
  public tryAgain(): void {
    this.tryAgainEmitter.next();
  }
}
