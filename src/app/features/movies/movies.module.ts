import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MoviesDetailsModule } from "./movies-details/movies-details.module";
import { MoviesListModule } from "./movies-list/movies-list.module";
import { MoviesRoutingModule } from "./movies-routing.module";
import { MoviesComponent } from "./movies.component";


@NgModule({
  declarations: [MoviesComponent],
  imports: [
    CommonModule,
    MoviesListModule,
    MoviesDetailsModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule {}
