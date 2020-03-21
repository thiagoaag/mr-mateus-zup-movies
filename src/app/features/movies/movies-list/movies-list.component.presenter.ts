import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

export class MoviesListPresenter {
  private searchTerms: Subject<string> = new Subject();
  searchTerms$: Observable<string> = this.searchTerms.pipe(
    debounceTime(300),
    distinctUntilChanged((a, b) => a === b)
  );

  search(term: string): void {
    this.searchTerms.next(term);
  }

  showMore(){
    
  }
}
