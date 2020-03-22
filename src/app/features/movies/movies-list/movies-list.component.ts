import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { switchMap, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { MoviesListService } from "./movies-list.service";
import { FormControl } from "@angular/forms";
@Component({
  selector: "app-movies-list",
  templateUrl: "./movies-list.component.html",
  styleUrls: ["./movies-list.component.css"]
})
export class MoviesListComponent implements OnInit, OnDestroy {
  constructor(public service: MoviesListService) {}

  ngOnInit() {
    this.service.initialize();
  }

  ngOnDestroy() {
    this.service.destroy();
  }
}
