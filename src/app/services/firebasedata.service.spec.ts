import { TestBed } from '@angular/core/testing';

import { FirebaseDataService } from './firebasedata.service';

describe('ChartdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseDataService = TestBed.get(FirebaseDataService);
    expect(service).toBeTruthy();
  });
});
