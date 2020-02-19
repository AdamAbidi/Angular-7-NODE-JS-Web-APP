import { TestBed } from '@angular/core/testing';

import { ShareDataServiceService } from './share-data-service.service';

describe('ShareDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShareDataServiceService = TestBed.get(ShareDataServiceService);
    expect(service).toBeTruthy();
  });
});
