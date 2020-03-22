import { Observable, of } from 'rxjs';
import { OMDbDto, OMDbError } from 'src/app/core/omdb/omdb-dto';

export class OmdbMockService {
    searchFor(term: string, page = 1): Observable<OMDbDto | OMDbError> {
        return of();
    }
}
