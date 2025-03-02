import { TestBed } from '@angular/core/testing';

import { OpeningFilesService } from './opening-files.service';

describe('OpeningFilesService', () => {
  let service: OpeningFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpeningFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
