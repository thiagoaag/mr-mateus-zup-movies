import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ServiceComponent } from '../service-component';
@Injectable({
  providedIn: 'root'
})
export class SearchService implements ServiceComponent {
  private search = new FormControl('');
  private search$ = new Subject<FormControl>();
  private destroy$ = new Subject<void>();
  constructor() {}

  initialize() {
    this.search.valueChanges // //
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(400),
        distinctUntilChanged((a, b) => a === b)
      ).subscribe(value =>
        this.search$.next(value)
      );
  }

  destroy() {
    this.search$.next();
    this.search$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
