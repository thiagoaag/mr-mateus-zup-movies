import { TestBed, tick, fakeAsync } from "@angular/core/testing";
import { OmdbService } from "./omdb.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { OMDbDto, OMDbError } from "./omdb-dto";
import { HttpClient, HttpParams } from "@angular/common/http";
import { of } from "rxjs";
import { MoviesListDto } from "src/app/features/movies/movies-list/movies-list-dto";
import { environment } from "src/environments/environment";

describe("OmdbService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OmdbService]
    })
  );

  let service: OmdbService;
  beforeEach(() => {
    service = TestBed.get(OmdbService);
  });

  it("deve instanciar o serviço", () => {
    expect(service).toBeTruthy();
  });

  it("deve buscar os filmes com o número de paginação default igual a 1", fakeAsync(() => {
    const htttp: HttpClient = TestBed.get(HttpClient);
    const omdbDto: OMDbDto = {
      Response: "True",
      Search: [
        {
          Title: "123 kill",
          Year: "2020",
          imdbID: "1"
        }
      ]
    };

    const spyGet = spyOn(htttp, "get").and.returnValue(of(omdbDto));
    let moviesListDto: OMDbDto = {};
    service.searchFor("123").subscribe(movies => {
      moviesListDto = movies;
    });
    tick();
    expect(moviesListDto).toBeTruthy();
    expect(moviesListDto.Search[0].imdbID).toEqual("1");
    let params = new HttpParams();
    params = params.append("s", "123");
    params = params.append("page", "1");
    expect(spyGet).toHaveBeenCalledWith(`${environment.OMDbAPI}`, { params });
  }));

  it("deve buscar os filmes com o número de paginação igual a 2", fakeAsync(() => {
    const htttp: HttpClient = TestBed.get(HttpClient);
    const omdbDto: OMDbDto = {
      Response: "True",
      Search: [
        {
          Title: "123 kill",
          Year: "2020",
          imdbID: "1"
        }
      ]
    };

    const spyGet = spyOn(htttp, "get").and.returnValue(of(omdbDto));
    let moviesListDto: OMDbDto = {};
    service.searchFor("123", 2).subscribe(movies => {
      moviesListDto = movies;
    });
    tick();
    expect(moviesListDto).toBeTruthy();
    expect(moviesListDto.Search[0].imdbID).toEqual("1");
    let params = new HttpParams();
    params = params.append("s", "123");
    params = params.append("page", "2");
    expect(spyGet).toHaveBeenCalledWith(`${environment.OMDbAPI}`, { params });
  }));

  it("deve mapear a resposta de erro para o padrão do dto OmdbDto", fakeAsync(() => {
    const htttp: HttpClient = TestBed.get(HttpClient);
    const omdbDto: OMDbError = {
      Error: 'Algo deu errado',
      Response: 'False'
    };

    const spyGet = spyOn(htttp, "get").and.returnValue(of(omdbDto));
    let moviesListDto: OMDbDto = {};
    service.searchFor("123", 1).subscribe(movies => {
      moviesListDto = movies;
    });
    tick();
    expect(moviesListDto).toBeTruthy();
    expect(moviesListDto.Response).toEqual("False");
    let params = new HttpParams();
    params = params.append("s", "123");
    params = params.append("page", "1");
    expect(spyGet).toHaveBeenCalledWith(`${environment.OMDbAPI}`, { params });
  }));
});
