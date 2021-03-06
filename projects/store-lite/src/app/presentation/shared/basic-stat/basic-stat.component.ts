import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-basic-stat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './basic-stat.component.html',
  styleUrls: ['./basic-stat.component.scss']
})
export class BasicStatComponent implements OnInit {

  @Input() number: number;
  @Input() iconUrl: string;
  @Input() text: string;
  @Input() viewUrl: string;

  constructor() { }

  ngOnInit() {
  }

}
