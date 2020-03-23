import { Observable, of } from 'rxjs';
import { OMDbDto, OMDbError, OMDbMovieDto } from 'src/app/core/omdb/omdb-dto';

export class OmdbMockService {
    searchFor(term: string, page = 1): Observable<OMDbDto | OMDbError> {
        return of();
    }

    findById(id: string): Observable<OMDbMovieDto> {
        return of();
    }
}
