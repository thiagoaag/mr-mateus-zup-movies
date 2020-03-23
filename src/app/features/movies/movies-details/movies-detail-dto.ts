export class MoviesDetailDto {
  title?: string;
  year?: string;
  rated?: string;
  released?: string;
  runtime?: string;
  genre?: string;
  director?: string;
  writer?: string;
  actors?: string;
  plot?: string;
  language?: string;
  country?: string;
  awards?: string;
  poster?: string;
  ratings?: Array<{
    source?: string;
    value?: string;
  }>;
  metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID?: string;
  type?: string;
  dvd?: string;
  boxOffice?: string;
  production?: string;
  website?: string;
  favorite?: boolean;
}
