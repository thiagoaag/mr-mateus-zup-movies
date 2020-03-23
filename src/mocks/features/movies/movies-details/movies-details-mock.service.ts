import { BehaviorSubject, Subject } from "rxjs";
import { MoviesDetailDto } from "src/app/features/movies/movies-details/movies-detail-dto";
export class MoviesDetailsMockService {
  public isLoading = false;
  private movieDetailsDto: BehaviorSubject<
    MoviesDetailDto
  > = new BehaviorSubject({});
  public movieDetailsDto$ = this.movieDetailsDto.asObservable();
  private destroy$ = new Subject();
  constructor() {}

  initialize(id: string) {}

  destroy() {}

  findById(id: string): void {}

  getCast(): Array<string> {
    return [];
  }

  getGenres(): Array<string> {
    return [];
  }

  getDirectors(): Array<string> {
    return [];
  }

  getRoten() {
    return "";
  }

  getImdb() {
    return "";
  }

  back() {}

  getImdbUrl() {}

  getRottenTomatoesUrl() {}
  favoriteMovie() {}
}
