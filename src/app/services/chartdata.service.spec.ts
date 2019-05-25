import { TestBed } from '@angular/core/testing';

import { ChartdataService } from './chartdata.service';

describe('ChartdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChartdataService = TestBed.get(ChartdataService);
    expect(service).toBeTruthy();
  });
});
