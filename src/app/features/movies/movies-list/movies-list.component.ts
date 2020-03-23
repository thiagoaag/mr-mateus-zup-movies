import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { switchMap, debounceTime, distinctUntilChanged, filter } from "rxjs/operators";
import { MoviesListService } from "./movies-list.service";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.css"]
})
export class MoviesListComponent implements OnInit, OnDestroy {
  constructor(
    public service: MoviesListService,
    private router: Router
    ) {}

  ngOnInit() {
    this.service.initialize();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.service.search(this.service.searchText.value, 1);
    });
  }

  ngOnDestroy() {
    this.service.destroy();
  }
}
