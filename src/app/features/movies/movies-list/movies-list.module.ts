import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListContainerComponent } from './movies-list.container';
import { MoviesListService } from './movies-list.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MoviesListComponent } from './movies-list.component';
import { MoviesListPresenter } from './movies-list.component.presenter';

@NgModule({
  declarations: [
    MoviesListContainerComponent,
    MoviesListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers: [
    MoviesListService,
    MoviesListPresenter
  ]
})
export class MoviesListModule { }
