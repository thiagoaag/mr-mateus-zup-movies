import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class OmdbService {
  constructor(private http: HttpClient) {}

  searchFor(term: string): Observable<any> {
    let params = new HttpParams();
    params = params.append("s", term);
    return this.http.get(environment.omdbApi, { params });
  }
}
