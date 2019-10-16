import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-radio-button-image-text',
  templateUrl: './radio-button-image-text.component.html',
  styleUrls: ['./radio-button-image-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonImageTextComponent implements OnInit {

  @Input() iconUrl: string;
  @Input() id: string;
  @Input() value: string;
  @Input() name: string;
  @Input() text: string;
  @Input() parentForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
