import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from 'rxjs';
import { OMDbDto, OMDbError } from './omdb-dto';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class OmdbService {
  constructor(private http: HttpClient) {}

  searchFor(term: string): Observable<OMDbDto | OMDbError> {
    let params = new HttpParams();
    params = params.append("s", term);
    return this.http
    .get(environment.OMDbAPI, { params }
    )
    .pipe(
      map(omdbResponse => {
        if (omdbResponse instanceof OMDbError) {
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
