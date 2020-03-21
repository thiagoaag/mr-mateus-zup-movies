import { Injectable } from "@angular/core";
import { Observable, of, Subject, BehaviorSubject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  debounce,
  takeUntil,
  map
} from "rxjs/operators";
import { OmdbService } from "src/app/core/omdb/omdb.service";
import { FormControl } from "@angular/forms";
import { MoviesListDto } from "./movies-list-dto";
import { OMDbDto } from "src/app/core/omdb/omdb-dto";

@Injectable({
  providedIn: "root"
})
export class MoviesListService {
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

  constructor(private omdbService: OmdbService) {}

  initialize() {
    this.searchText.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500))
      .subscribe(term => {
        this.search(term, 1);
      });
  }

  destroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  search(term, page) {
    this.omdbService
      .searchFor(term, page)
      .pipe(
        takeUntil(this.destroy$),
        map(omdbResponse => this.mapToMovieListDto(omdbResponse))
      )
      .subscribe(
        moviesListMapped => {
          const totalPages = Number(Number(moviesListMapped.total) / 10);
          this.hasNext = this.page < totalPages;
          if (
            this.moviesListDto.getValue().movies &&
            this.moviesListDto.getValue().movies.length > 0 &&
            moviesListMapped &&
            moviesListMapped.movies.length > 0
          ) {
            const concatMovies = [
              ...this.moviesListDto.getValue().movies,
              ...moviesListMapped.movies
            ];
            this.moviesListDto.next({
              ...moviesListMapped,
              movies: concatMovies
            });
          } else {
            this.moviesListDto.next(moviesListMapped);
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
  }

  showMore() {
    if (this.hasNext) {
      this.page += 1;
      this.search(this.searchText.value, this.page);
    }
  }

  private mapToMovieListDto(omdbResponse: OMDbDto): MoviesListDto {
    if (omdbResponse.Search && omdbResponse.Search.length > 0) {
      return {
        movies: omdbResponse.Search.map(movie => ({
          title: movie.Title,
          imdbID: movie.imdbID,
          poster: movie.Poster
        })),
        response: omdbResponse.Response,
        total: omdbResponse.totalResults,
        error: omdbResponse.Error
      } as MoviesListDto;
    } else {
      return {
        movies: [],
        response: "false",
        total: "0"
      } as MoviesListDto;
    }
  }

  getNotFoundPoster() {
    return "./assets/3.Poster/poster-not-found.jpg";
  }
}
