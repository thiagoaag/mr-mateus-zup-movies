import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list.component';
import { MoviesListService } from './movies-list.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [MoviesListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxLoadingModule
  ],
  providers: [
    MoviesListService
  ]
})
export class MoviesListModule { }
