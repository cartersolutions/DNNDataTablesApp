import { TestBed } from '@angular/core/testing';

import { DnndatatablesService } from './dnndatatables.service';

describe('DnndatatablesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DnndatatablesService = TestBed.get(DnndatatablesService);
    expect(service).toBeTruthy();
  });
});
