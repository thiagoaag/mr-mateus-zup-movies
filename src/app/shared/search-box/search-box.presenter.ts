import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class SearchBoxPresenter {
  private searchTerms: Subject<string> = new Subject();
  searchTerms$: Observable<string> = this.searchTerms.pipe(
    debounceTime(300),
    distinctUntilChanged()
  );

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
