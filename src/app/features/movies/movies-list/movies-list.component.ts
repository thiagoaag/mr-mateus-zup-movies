import { Component, OnInit } from '@angular/core';
import { OmdbService } from 'src/app/core/omdb/omdb.service';
import { FormControl } from '@angular/forms';
import { MoviesListService } from './movies-list.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css'],
  providers: [MoviesListService]
})
export class MoviesListComponent {
  isLoading = this.movieListService.isLoading;
  searchField = this.movieListService.searchField;
  get movies() {
    return this.movieListService.movies;
  }
  constructor(public movieListService: MoviesListService) { }

}
