import { Injectable } from "@angular/core";
import { MovieDto } from "src/app/features/movies/movies-list/movies-list-dto";

@Injectable({ providedIn: "root" })
export class FavoriteMovieService {
  private FAVORITE_MOVIES_KEY_LOCAL_STORAGE = "favorite-movies";
  constructor() {}

  searchByImdbId(imdbId: string): MovieDto {
    const moviesString = localStorage.getItem(
      this.FAVORITE_MOVIES_KEY_LOCAL_STORAGE
    );
    if (moviesString) {
      const movies =  JSON.parse(moviesString) as Array<MovieDto>;
      const moviesFilteres = movies.filter(movieFilter => movieFilter.imdbID === imdbId);
      return moviesFilteres && moviesFilteres.length > 0 ? moviesFilteres[0] : undefined;
    } else {
      return undefined;
    }
  }
  searchAllFavoriteMovies(): Array<MovieDto> {
    const moviesString = localStorage.getItem(
      this.FAVORITE_MOVIES_KEY_LOCAL_STORAGE
    );
    if (moviesString) {
      return JSON.parse(moviesString);
    } else {
      return [];
    }
  }

  saveFavoriteMovie(movie: MovieDto): void {
    const favoriteMoviesString = localStorage.getItem(this.FAVORITE_MOVIES_KEY_LOCAL_STORAGE);
    let favoriteMovies = [];
    if (favoriteMoviesString) {
        favoriteMovies = JSON.parse(favoriteMoviesString) as Array<MovieDto>;
        favoriteMovies.push(movie);
    } else {
        favoriteMovies.push(movie);
    }
    localStorage.setItem(
      this.FAVORITE_MOVIES_KEY_LOCAL_STORAGE,
      JSON.stringify(favoriteMovies)
    );
  }

  removeFavoriteMovie(movie: MovieDto): void {
    let favoriteMovies: Array<MovieDto> = JSON.parse(
      localStorage.getItem(this.FAVORITE_MOVIES_KEY_LOCAL_STORAGE)
    ) as Array<MovieDto>;
    if (favoriteMovies && favoriteMovies.length > 0) {
      favoriteMovies = favoriteMovies.filter(
        movieFilter => movieFilter.imdbID !== movie.imdbID
      );
      localStorage.setItem(
        this.FAVORITE_MOVIES_KEY_LOCAL_STORAGE,
        JSON.stringify(favoriteMovies)
      );
    } else {
      throw new Error("Movie not found on the list of favorites");
    }
  }
}
