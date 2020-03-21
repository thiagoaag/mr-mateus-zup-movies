import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { OMDBResponse } from "./omdb-dto";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class OMDBService {
  constructor(private http: HttpClient) {}

  searchMovies(term: string): Observable<OMDBResponse | { Response: string; Error: string }> {
    let params: HttpParams = new HttpParams();
    params = params.append("s", term);

    return this.http
      .get<OMDBResponse | { Response: string; Error: string }>(
        environment.omdAPI,
        { params }
      )
      .pipe(
        map(omdbResponse => {
          if (omdbResponse instanceof OMDBResponse) {
            return omdbResponse;
          } else {
            return {
              Response: omdbResponse.Response,
              Error: omdbResponse.Error
            } as OMDBResponse;
          }
        })
      );
  }
}
