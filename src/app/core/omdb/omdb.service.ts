import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  constructor(private http: HttpClient) { }

  search(search: string, page: number) {
    return this.http.get(`${environment.OMDBAPI}&s=${search}&page=${page}`);
  }
}
