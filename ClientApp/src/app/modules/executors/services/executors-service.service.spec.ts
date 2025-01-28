import { TestBed } from '@angular/core/testing';

import { ExecutorsServiceService } from './executors-service.service';

describe('ExecutorsServiceService', () => {
  let service: ExecutorsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecutorsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
