import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarGaugeComponent } from './bar-gauge.component';

describe('BarGaugeComponent', () => {
  let component: BarGaugeComponent;
  let fixture: ComponentFixture<BarGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
