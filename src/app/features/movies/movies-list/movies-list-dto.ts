export interface MoviesListDto {
    movies?: Array<MovieDto>;
    response?: string;
    total?: string;
    error?: string;
}

export class MovieDto {
    title?: string;
    imdbID?: string;
    poster?: string;
}
