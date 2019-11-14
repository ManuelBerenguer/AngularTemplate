import { Directive, OnInit, ElementRef, Input } from '@angular/core';
import { TranslateService } from '../services/translate.service';

@Directive({
  selector: '[appTranslate]'
})
export class TranslateDirective implements OnInit {
  @Input('appTranslate') ptTx: string;
  constructor(private el: ElementRef, private tx: TranslateService) {}

  ngOnInit() {
    this.el.nativeElement.textContent = this.tx.instant(this.ptTx);
  }
}
