import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {

  title: string;
  body: string;
  list: string[];

  selectFilesAgainAction$: Subject<any>; // Observable to emit notification to parent

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.selectFilesAgainAction$ = new Subject();
  }

  public selectFilesAgain() {
    // We close the modal error window
    this.bsModalRef.hide();
    // We emit notification to parent component to show file selection again
    this.selectFilesAgainAction$.next();
  }
}
