import { TestBed } from '@angular/core/testing';

import { OMDBAPIInterceptorInterceptor } from './omdbapiinterceptor.interceptor';

describe('OMDBAPIInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      OMDBAPIInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: OMDBAPIInterceptorInterceptor = TestBed.inject(OMDBAPIInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
