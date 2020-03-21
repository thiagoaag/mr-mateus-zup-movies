export class OMDBResponse {
  Search?: Array<MovieDto>;
  Response?: boolean;
  TotalResults?: number;
  Error?: string;

}
export class MovieDto {
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
  Ratings?: [
    {
      Source?: string;
      Value?: string;
    },
    {
      Source?: string;
      Value?: string;
    },
    {
      Source?: string;
      Value?: string;
    }
  ];
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
