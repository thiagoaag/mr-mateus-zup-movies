import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MoviesDetailsComponent } from './movies-details/movies-details.component';
import { MoviesComponent } from './movies.component';


const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: 'list',
        component: MoviesListComponent
      },
      {
        path: 'details',
        component: MoviesDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
