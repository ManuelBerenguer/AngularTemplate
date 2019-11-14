import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-text',
  templateUrl: './image-text.component.html',
  styleUrls: ['./image-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // We should use this strategy only for components that depend only on their inputs
})
export class ImageTextComponent {

  @Input() text: string;
  @Input() iconUrl: string;
  @Input() iconClass: string;
  @Input() adjustIcon: boolean;

  constructor() {}
}
