import { Component, OnInit, OnDestroy } from "@angular/core";
import { MoviesDetailsService } from "./movies-details.service";
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: "app-movies-details",
  templateUrl: "./movies-details.component.html",
  styleUrls: ["./movies-details.component.css"]
})
export class MoviesDetailsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  constructor(
    private route: ActivatedRoute,
    public service: MoviesDetailsService
  ) {}

  ngOnInit(): void {
    this.route.params
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(params => {
      this.service.initialize(params.id);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.service.destroy();
  }
}
