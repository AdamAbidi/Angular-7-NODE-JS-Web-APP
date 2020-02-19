import { TestBed } from '@angular/core/testing';

import { ConnectCrudService } from './connect-crud.service';

describe('ConnectCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConnectCrudService = TestBed.get(ConnectCrudService);
    expect(service).toBeTruthy();
  });
});
