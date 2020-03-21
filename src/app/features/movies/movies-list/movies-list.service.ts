import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { OMDBService } from "src/app/core/omdb/omdb.service";
import { MoviesListDto } from "./movies-list-dto-";
import { OMDBResponse } from "src/app/core/omdb/omdb-dto";

@Injectable({ providedIn: "root" })
export class MoviesListService {
  totalPages = 0;
  page = 1;

  constructor(private omdbService: OMDBService) {}

  searchMovies(term: string): Observable<MoviesListDto> {
    this.page = 1;
    this.totalPages = 0;

    if (term) {
      return this.omdbService //
        .searchMovies(term)
        .pipe(map(omdbResponse => this.mapToMovieListDto(omdbResponse)));
    } else {
      return this.favoriteMovies();
    }
  }

  favoriteMovies(): Observable<MoviesListDto> {
    return of<MoviesListDto>(undefined);
  }

  private mapToMovieListDto(
    omdbResponse: OMDBResponse | { Response: string; Error: string }
  ) {
    if (omdbResponse instanceof OMDBResponse) {
      if (omdbResponse.Search && omdbResponse.Search.length > 0) {
        this.totalPages = Number(omdbResponse.TotalResults / 10);
        return {
          movies: omdbResponse.Search.map(movie => ({
            title: movie.Title,
            imdbID: movie.imdbID,
            poster: movie.Poster
          })),
          response: omdbResponse.Response,
          total: omdbResponse.TotalResults
        } as MoviesListDto;
      } else {
        this.totalPages = 0;
        this.page = 1;
        return {
          movies: [],
          response: false,
          total: 0
        };
      }
    } else {
      return {
        movies: [],
        error: omdbResponse.Error,
        response: omdbResponse.Response
          ? omdbResponse.Response.toLowerCase()
          : false
      } as MoviesListDto;
    }
  }
}