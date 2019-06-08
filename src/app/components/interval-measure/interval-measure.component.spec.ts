import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervalMeasureComponent } from './interval-measure.component';

describe('IntervalMeasureComponent', () => {
  let component: IntervalMeasureComponent;
  let fixture: ComponentFixture<IntervalMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervalMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervalMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
