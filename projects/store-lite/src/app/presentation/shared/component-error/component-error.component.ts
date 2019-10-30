import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-component-error',
  templateUrl: './component-error.component.html',
  styleUrls: ['./component-error.component.scss']
})
export class ComponentErrorComponent implements OnInit {

  constructor() { }

  // To emit an event to the parent to inform we want to retry
  @Output() public tryAgainEmitter = new EventEmitter();

  ngOnInit() {
  }

  /**
   * @description It will use the event emitter to inform the parent to try again
   */
  public tryAgain(): void {
    this.tryAgainEmitter.next();
  }
}
