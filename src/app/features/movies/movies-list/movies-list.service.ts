import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { OmdbService } from 'src/app/core/omdb/omdb.service';
import { distinctUntilChanged, debounceTime, finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesListService {
  private _response: any;
  get response() {
    return this._response;
  }
  public _isLoading: boolean = false;
  get isLoading() {
    return this._response;
  }

  get movies(){
    return this._response ? this._response.movies : [];
  }
  private _page = 1;
  private _searchTerm = new FormControl();

  get searchField(): FormControl {
    return this._searchTerm;
  }


  constructor(private omdbService: OmdbService) {
    this._searchTerm //
      .valueChanges //
      .pipe( //
        debounceTime(400), //
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)) //
        
      ).subscribe(() => {
        this._page = 1;
        this.search(this._page);
      });
  }

  public showMore() {
    this._page += 1;
    this.search(this._page);
  }

  public search(page: number) {
    this._isLoading = false;
    this.omdbService
      .search(this._searchTerm.value, page)
      .pipe(
        map((response: any) => ({movies: response.Search})),
        finalize(() => this._isLoading = false)
      )
      .subscribe(response => {
        this._response = response;
      })
  }
}
