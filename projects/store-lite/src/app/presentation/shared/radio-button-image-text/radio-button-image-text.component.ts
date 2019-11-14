import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-radio-button-image-text',
  templateUrl: './radio-button-image-text.component.html',
  styleUrls: ['./radio-button-image-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonImageTextComponent),
      multi: true // enables multi providers, allowing multiple values for a single DI token
    }// ,
    // {
    //   provide: NG_VALIDATORS,
    //   useExisting: forwardRef(() => RadioButtonImageTextComponent),
    //   multi: true,
    // }
  ]
})
export class RadioButtonImageTextComponent implements ControlValueAccessor {

  @Input() data: any = {};

  form: FormGroup;

  private onChange: (value: any) => void;
  private onTouched: () => void;

  // The value associated to this custom form control
  value: number;

  constructor() {}

  // It triggers every time the selected option changes
  selectOption(option: number) {
    // We update the inner value of the custom control
    this.value = option;

    // We trigger
    this.onChange(option);

    this.onTouched();
  }

  writeValue(obj: number): void {
    // every time the form control is being updated from the parent
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    // when we want to let the parent know that the value of the form control should be updated call `fn` callback
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    // when we want to let the parent know that the form control has been touched call `fn` callback
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // when the parent updates the state of the form control
    throw new Error('Method not implemented.');
  }
}
