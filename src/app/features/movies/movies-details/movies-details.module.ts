import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MoviesDetailsComponent } from "./movies-details.component";
import { MoviesDetailsService } from './movies-details.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FavoriteMovieService } from 'src/app/core/favorite-movie/favorite-movie.service';
import { OmdbService } from 'src/app/core/omdb/omdb.service';

@NgModule({
  declarations: [MoviesDetailsComponent],
  imports: [CommonModule],
  providers:[MoviesDetailsService]
})
export class MoviesDetailsModule {
}
