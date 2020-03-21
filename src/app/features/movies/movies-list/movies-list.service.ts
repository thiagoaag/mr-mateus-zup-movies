import { Injectable } from "@angular/core";
import { Observable, of, Subject, BehaviorSubject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  debounce,
  takeUntil
} from "rxjs/operators";
import { OmdbService } from "src/app/core/omdb/omdb.service";
import { FormControl } from "@angular/forms";

@Injectable({
  providedIn: "root"
})
export class MoviesListService {
  public searchText = new FormControl("");
  private moviesListDto = new BehaviorSubject({});
  public moviesListDto$: Observable<any> = this.moviesListDto.asObservable();
  private destroy$ = new Subject();
  constructor(private omdbService: OmdbService) {}

  initialize() {
    this.searchText.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500))
      .subscribe(term => {
        this.omdbService
          .searchFor(term)
          .pipe(takeUntil(this.destroy$))
          .subscribe(omdbResponse => {
            this.moviesListDto.next(omdbResponse);
          });
      });
  }

  destroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
