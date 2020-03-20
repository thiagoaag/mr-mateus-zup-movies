import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { ZupMoviesModule } from 'zup-movies';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesDetailsComponent } from './movies-details/movies-details.component';
import { ZupSearchModule } from 'projects/zup-movies/src/public-api';


@NgModule({
  declarations: [
    MoviesListComponent,
    MoviesDetailsComponent,
    MoviesComponent],
  imports: [
    CommonModule,
    ZupMoviesModule,
    ZupSearchModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
