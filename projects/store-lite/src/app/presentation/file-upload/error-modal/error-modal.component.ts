import { Component, OnInit } from '@angular/core';
import { StoreLitePresentation } from '../../../core/services/store-lite.presentation';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {

  constructor(/*public storeLitePresentation: StoreLitePresentation,*/ public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

}
