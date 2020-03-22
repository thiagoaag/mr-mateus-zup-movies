import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list.component';
import { MoviesListService } from './movies-list.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MoviesListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    MoviesListService
  ]
})
export class MoviesListModule { }
