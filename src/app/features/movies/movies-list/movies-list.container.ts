import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { switchMap, takeUntil, finalize } from "rxjs/operators";
import { MoviesListService } from "./movies-list.service";
import { MoviesListDto } from './movies-list-dto-';

@Component({
  selector: "app-movies-list-container",
  templateUrl: "./movies-list.container.html",
  styleUrls: ["./movies-list.container.css"]
})
export class MoviesListContainerComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  private loading: Subject<boolean> = new Subject();

  private searchTerms: Subject<string> = new Subject();

  loading$: Observable<boolean> = this.loading;

  moviesListDto$: Observable<MoviesListDto> = this.searchTerms.pipe(
    switchMap(term => {
      this.loading.next(true);
      return this.moviesListService //
        .searchMovies(term)
        .pipe(
          takeUntil(this.destroy$), //
          finalize(() => this.loading.next(false))
        );
    })
  );

  constructor(private moviesListService: MoviesListService) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
