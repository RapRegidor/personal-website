import { TestBed } from '@angular/core/testing';

import { OpeningTabsService } from './opening-tabs.service';

describe('OpeningTabsService', () => {
  let service: OpeningTabsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpeningTabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
