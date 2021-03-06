export class OMDbDto {
  Search?: Array<OMDbMovieDto>;
  Response?: string;
  totalResults?: string | number;
  Error?: string;

}
export class OMDbMovieDto {
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: Array<{
    Source?: string;
    Value?: string;

  }>;
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID?: string;
  Type?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
}

export class OMDbError {
  Response?: string;
  Error?: string;
}
