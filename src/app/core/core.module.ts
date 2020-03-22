import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OmdbService as OmdbService } from './omdb/omdb.service';
import { HttpClientModule } from '@angular/common/http';
import { FavoriteMovieService } from './favorite-movie/favorite-movie.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    OmdbService,
    FavoriteMovieService
  ]
})
export class CoreModule { }
