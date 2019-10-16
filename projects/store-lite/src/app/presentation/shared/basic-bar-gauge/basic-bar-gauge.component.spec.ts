import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicBarGaugeComponent } from './basic-bar-gauge.component';

describe('BasicBarGaugeComponent', () => {
  let component: BasicBarGaugeComponent;
  let fixture: ComponentFixture<BasicBarGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicBarGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicBarGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
