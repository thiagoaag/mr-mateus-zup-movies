import { Location } from "@angular/common";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { finalize, map } from "rxjs/operators";
import { FavoriteMovieService } from "src/app/core/favorite-movie/favorite-movie.service";
import { OMDbMovieDto } from "src/app/core/omdb/omdb-dto";
import { OmdbService } from "src/app/core/omdb/omdb.service";
import { MoviesDetailDto } from "./movies-detail-dto";
import { MovieDto } from "../movies-list/movies-list-dto";

@Injectable({
  providedIn: "root"
})
export class MoviesDetailsService {
  public isLoading = false;
  private movieDetailsDto: BehaviorSubject<
    MoviesDetailDto
  > = new BehaviorSubject({});
  public movieDetailsDto$ = this.movieDetailsDto.asObservable();
  constructor(
    private omdbService: OmdbService,
    private location: Location,
    private favoriteMovieService: FavoriteMovieService
  ) {}

  initialize(id: string) {
    this.findById(id);
  }


  findById(id: string): void {
    this.isLoading = true;
    this.omdbService
      .findById(id)
      .pipe(
        map((omdbResponse: OMDbMovieDto) => {
          const movie = this.mapToMoviesDetailDto(omdbResponse);

          const favoriteMovie = this.favoriteMovieService.searchByImdbId(
            omdbResponse.imdbID
          );
          if (favoriteMovie) {
            movie.favorite = favoriteMovie.favorite;
          }

          return movie;
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe(movieDetail => {
        this.movieDetailsDto.next(movieDetail);
      });
  }

  private mapToMoviesDetailDto(omdbResponse: OMDbMovieDto): MoviesDetailDto {
    return  {
      title: omdbResponse.Title,
      year: omdbResponse.Year,
      rated: omdbResponse.Rated,
      released: omdbResponse.Released,
      runtime: omdbResponse.Runtime,
      genre: omdbResponse.Genre,
      director: omdbResponse.Director,
      writer: omdbResponse.Writer,
      actors: omdbResponse.Actors,
      plot: omdbResponse.Plot,
      language: omdbResponse.Language,
      country: omdbResponse.Country,
      awards: omdbResponse.Awards,
      poster: omdbResponse.Poster,
      ratings:
        omdbResponse.Ratings && omdbResponse.Ratings.length > 0
          ? omdbResponse.Ratings.map(rating => ({
              source: rating.Source,
              value: rating.Value
            }))
          : undefined,
      metascore: omdbResponse.Metascore,
      imdbRating: omdbResponse.imdbRating,
      imdbVotes: omdbResponse.imdbVotes,
      imdbID: omdbResponse.imdbID,
      type: omdbResponse.Type,
      dvd: omdbResponse.DVD,
      boxOffice: omdbResponse.BoxOffice,
      production: omdbResponse.Production,
      website: omdbResponse.Website
    } as MoviesDetailDto;
  }

  getCast(): Array<string> {
    return this.movieDetailsDto.getValue().actors
      ? this.movieDetailsDto.getValue().actors.split(",")
      : [];
  }

  getGenres(): Array<string> {
    return this.movieDetailsDto.getValue().genre
      ? this.movieDetailsDto.getValue().genre.split(",")
      : [];
  }

  getDirectors(): Array<string> {
    return this.movieDetailsDto.getValue().director
      ? this.movieDetailsDto.getValue().director.split(",")
      : [];
  }

  private getRating(source: string) {
    const ratings = this.movieDetailsDto.getValue().ratings;
    if (ratings && ratings.length > 0) {
      const ratingFiltered = ratings.filter(rate => rate.source === source);
      if (ratingFiltered && ratingFiltered.length > 0) {
        return ratingFiltered[0].value;
      } else {
        return "N/A";
      }
    } else {
      return "N/A";
    }
  }
  getRoten() {
    return this.getRating("Rotten Tomatoes");
  }

  getImdb() {
    return this.getRating("Internet Movie Database");
  }

  back() {
    this.location.back();
  }

  getImdbUrl() {
    if (this.movieDetailsDto.getValue().imdbID) {
      const imdbId = this.movieDetailsDto.getValue().imdbID;
      return `https://www.imdb.com/title/${imdbId}`;
    } else {
      return `https://www.imdb.com`;
    }
  }

  getRottenTomatoesUrl() {
    if (this.movieDetailsDto.getValue().title) {
      const title = this.movieDetailsDto.getValue().title;
      return `https://www.rottentomatoes.com/search?search=${title}`;
    } else {
      return `https://www.rottentomatoes.com`;
    }
  }
  favoriteMovie() {
    const movieDetailDto = this.movieDetailsDto.getValue();
    if (movieDetailDto.favorite) {
      movieDetailDto.favorite = false;
    } else {
      movieDetailDto.favorite = true;
    }
    this.movieDetailsDto.next(movieDetailDto);
    const favoriteMovieDto = {
      favorite: movieDetailDto.favorite,
      imdbID: movieDetailDto.imdbID,
      poster: movieDetailDto.poster
    } as MovieDto;
    if (movieDetailDto.favorite) {
      this.favoriteMovieService.saveFavoriteMovie(favoriteMovieDto);
    } else {
      this.favoriteMovieService.removeFavoriteMovie(favoriteMovieDto);
    }
  }
}
