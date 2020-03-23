import { TestBed } from '@angular/core/testing';

import { MoviesDetailsService } from './movies-details.service';
import { OmdbService } from 'src/app/core/omdb/omdb.service';
import { OmdbMockService } from 'src/mocks/core/omdb/omdb-mock.service';
import { FavoriteMovieService } from 'src/app/core/favorite-movie/favorite-movie.service';
import { FavoriteMovieMockService } from 'src/mocks/core/favorite-movie/favorite-movie.service';
import { CommonModule, Location } from '@angular/common';
import { LocationMock } from 'src/mocks/@angular/common/location-mock';

describe('MoviesDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MoviesDetailsService,
      {
        provide: OmdbService,
        useClass: OmdbMockService
      },
      {
        provide: FavoriteMovieService,
        useClass: FavoriteMovieMockService
      },
      {
        provide: Location,
        useClass: LocationMock
      }
    ]
  }));

  it('deve instanciar o serviço', () => {
    const service: MoviesDetailsService = TestBed.get(MoviesDetailsService);
    expect(service).toBeTruthy();
  });
});
