import { TestBed } from '@angular/core/testing';

import { ZupMoviesService } from './zup-movies.service';

describe('ZupMoviesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZupMoviesService = TestBed.get(ZupMoviesService);
    expect(service).toBeTruthy();
  });
});
