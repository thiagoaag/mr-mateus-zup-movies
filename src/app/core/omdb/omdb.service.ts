import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { OMDbDto, OMDbError, OMDbMovieDto } from "./omdb-dto";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class OmdbService {
  constructor(private http: HttpClient) {}

  findById(id: string): Observable<OMDbMovieDto> {
    return this.http.get(`${environment.OMDbAPI}&i=${id}`);
  }
  searchFor(term: string, page = 1): Observable<OMDbDto | OMDbError> {
    let params = new HttpParams();
    params = params.append("s", term);
    params = params.append("page", page.toString());
    return this.http
      .get<OMDbDto | OMDbError>(environment.OMDbAPI, { params })
      .pipe(
        map(omdbResponse => {
          if (omdbResponse.Error) {
            return {
              Error: omdbResponse.Error,
              Response: omdbResponse.Response
            } as OMDbDto;
          } else {
            return omdbResponse;
          }
        })
      );
  }
}
