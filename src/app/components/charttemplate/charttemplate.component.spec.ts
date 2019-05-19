import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartTemplateComponent } from './charttemplate.component';

describe('ChartTemplateComponent', () => {
  let component: ChartTemplateComponent;
  let fixture: ComponentFixture<ChartTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
