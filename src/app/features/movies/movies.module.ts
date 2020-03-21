import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { MoviesListContainerComponent } from './movies-list/movies-list.container';
import { MoviesDetailsComponent } from './movies-details/movies-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MoviesListModule } from './movies-list/movies-list.module';


@NgModule({
  declarations: [
    MoviesDetailsComponent,
    MoviesComponent],
  imports: [
    CommonModule,
    SharedModule,
    MoviesListModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule { }
