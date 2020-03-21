export class MoviesListDto {
    movies?: Array<Movie>;
    error?: string;
    response?: boolean;
    total?: number;
}

export class Movie {
    title?: string;
    imdbID?: string;
    poster?: string;
}