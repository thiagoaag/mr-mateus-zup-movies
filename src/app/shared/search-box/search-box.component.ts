import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SearchBoxPresenter } from './search-box.presenter';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  @Output() search: EventEmitter<string> = new EventEmitter();
  private destroy: Subject<void> = new Subject();

  constructor(private presenter: SearchBoxPresenter) {}

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
