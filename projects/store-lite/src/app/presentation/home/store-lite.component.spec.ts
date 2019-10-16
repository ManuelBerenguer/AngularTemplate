import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreLiteComponent } from './store-lite.component';

describe('StoreLiteComponent', () => {
  let component: StoreLiteComponent;
  let fixture: ComponentFixture<StoreLiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreLiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreLiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
