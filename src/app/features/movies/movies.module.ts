import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesDetailsComponent } from './movies-details/movies-details.component';
import { ZupComponentsModule } from 'projects/zup-movies/src/public-api';
import { MoviesListModule } from './movies-list/movies-list.module';


@NgModule({
  declarations: [
    MoviesDetailsComponent,
    MoviesComponent],
  imports: [
    CommonModule,
    MoviesListModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
