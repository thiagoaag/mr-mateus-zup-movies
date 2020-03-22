import { FormControl } from "@angular/forms";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import {
  MoviesListDto,
  MovieDto
} from "src/app/features/movies/movies-list/movies-list-dto";
import { OmdbService } from "src/app/core/omdb/omdb.service";
import { DeviceDetectorService } from "ngx-device-detector";
import { Router } from "@angular/router";
import { takeUntil, debounceTime, map } from "rxjs/operators";
import { OMDbDto } from "src/app/core/omdb/omdb-dto";

export class MoviesListMockService {
  public searchText = new FormControl("");
  public hasNext = false;
  public page = 1;
  private moviesListDto: BehaviorSubject<MoviesListDto> = new BehaviorSubject(
    {}
  );
  public moviesListDto$: Observable<
    MoviesListDto
  > = this.moviesListDto.asObservable();
  private destroy$ = new Subject();
  public isDesktop = true;

  constructor() {}

  initialize() {}

  destroy() {}

  search(term, page) {}

  showMore() {}

  deskTopNavigateToMovie(movie: MovieDto) {}

  mobileNavigateToMovie(movie: MovieDto) {}
}
