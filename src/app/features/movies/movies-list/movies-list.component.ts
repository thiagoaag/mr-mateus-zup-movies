import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MoviesListPresenter } from './movies-list.component.presenter';
import { MoviesListDto } from './movies-list-dto-';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  @Input() loading = false;
  @Input() moviesListDto: MoviesListDto[] = [];

  @Output() search: EventEmitter<string> = new EventEmitter();

  private destroy: Subject<void> = new Subject();

  constructor(private presenter: MoviesListPresenter) {}

  ngOnInit(): void {
    this.presenter.searchTerms$.pipe(
      takeUntil(this.destroy),
    ).subscribe(term => this.search.emit(term));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  searchFor(term: string): void {
    this.presenter.search(term);
  }

}
