import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { DeviceDetectorService } from "ngx-device-detector";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import {
  debounceTime,
  finalize,
  map,
  takeUntil,
  switchMap,
  filter
} from "rxjs/operators";
import { FavoriteMovieService } from "src/app/core/favorite-movie/favorite-movie.service";
import { OMDbDto } from "src/app/core/omdb/omdb-dto";
import { OmdbService } from "src/app/core/omdb/omdb.service";
import { MovieDto, MoviesListDto } from "./movies-list-dto";

@Injectable({
  providedIn: "root"
})
export class MoviesListService {
  private destroy$ = new Subject();
  public favoriteFiltersActivated = false;
  public searchText = new FormControl("");
  public hasNext = false;
  public page = 1;
  public isLoading = false;
  private moviesListDto: BehaviorSubject<MoviesListDto> = new BehaviorSubject(
    {}
  );
  public moviesListDto$: Observable<
    MoviesListDto
  > = this.moviesListDto.asObservable().pipe(takeUntil(this.destroy$));
  public isDesktop = true;

  constructor(
    private omdbService: OmdbService,
    private deviceDetectorService: DeviceDetectorService,
    private router: Router,
    private favoriteMovieService: FavoriteMovieService
  ) {
    this.isDesktop = this.deviceDetectorService.isDesktop();
  }

  initialize() {
    this.searchText.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(400))
      .subscribe(term => {
        this.search(term, 1);
      });
  }

  destroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  search(term, page) {
    if (this.favoriteFiltersActivated) {
      this.searchFavorites(term);
    } else if (term) {
      this.isLoading = true;
      this.omdbService
        .searchFor(term, page)
        .pipe(
          takeUntil(this.destroy$),
          map(omdbResponse => this.mapToMovieListDto(omdbResponse)),
          finalize(() => (this.isLoading = false))
        )
        .subscribe(
          moviesListMapped => {
            const totalPages = Number(Number(moviesListMapped.total) / 10);
            this.hasNext = this.page < totalPages;
            if (this.page === 1) {
              this.moviesListDto.next(moviesListMapped);
            } else {
              const concatMovies = [
                ...this.moviesListDto.getValue().movies,
                ...moviesListMapped.movies
              ];
              this.moviesListDto.next({
                ...moviesListMapped,
                movies: concatMovies
              });
            }
          },
          error => {
            this.moviesListDto.next({
              error: "Something goes wrong :(",
              response: "false"
            });
            console.error(error);
          }
        );
    } else {
      this.moviesListDto.next({
        response: "false",
        movies: []
      });
    }
  }

  activateFilterFavorites() {
    this.favoriteFiltersActivated = !this.favoriteFiltersActivated;
    this.search(this.searchText.value, "1");
  }

  searchFavorites(term: string) {
    const movies = this.favoriteMovieService.searchAllFavoriteMovies();
    if (movies && movies.length > 0) {
      const filteredMovies = movies.filter(movie => movie.title.toLowerCase().indexOf(term.toLowerCase()) >= 0);
      const moviesListDto: MoviesListDto = {
        movies: filteredMovies,
        response: "true",
        total: movies.length.toString()
      };

      this.moviesListDto.next(moviesListDto);
    } else {
      this.moviesListDto.next({
        response: "false",
        movies: []
      });
    }
  }

  showMore() {
    if (this.hasNext) {
      this.page += 1;
      this.search(this.searchText.value, this.page);
    }
  }

  private mapToMovieListDto(omdbResponse: OMDbDto): MoviesListDto {
    if (omdbResponse.Search && omdbResponse.Search.length > 0) {
      const moviesListDto = {
        movies: omdbResponse.Search.map(movie => ({
          title: movie.Title,
          imdbID: movie.imdbID,
          poster: movie.Poster,
          year: movie.Year
        })),
        response: omdbResponse.Response.toLowerCase(),
        total: omdbResponse.totalResults,
        error: omdbResponse.Error
      } as MoviesListDto;
      const favoriteMovies = this.favoriteMovieService.searchAllFavoriteMovies();
      moviesListDto.movies.map(movie => {
        const favoriteMovieFiltered = favoriteMovies.filter(
          filterMovie => filterMovie.imdbID === movie.imdbID
        );
        if (favoriteMovieFiltered && favoriteMovieFiltered.length > 0) {
          movie.favorite = true;
        }
        return movie;
      });
      return moviesListDto;
    } else {
      return {
        movies: [],
        response: "false",
        total: "0",
        error: omdbResponse.Error
      } as MoviesListDto;
    }
  }

  desktopNavigateToMovie(movie: MovieDto) {
    if (this.isDesktop) {
      this.router.navigate([`movies/details`, movie.imdbID]);
    }
  }

  mobileNavigateToMovie(movie: MovieDto) {
    this.router.navigate([`movies/details`, movie.imdbID]);
  }

  addFavoriteMovie(movie: MovieDto) {
    movie.favorite = true;
    this.favoriteMovieService.saveFavoriteMovie(movie);
  }

  removeFavoriteMovie(movie: MovieDto) {
    movie.favorite = false;
    this.favoriteMovieService.removeFavoriteMovie(movie);
  }
}
