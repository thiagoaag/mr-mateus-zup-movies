import { TestBed, fakeAsync, tick } from "@angular/core/testing";

import { MoviesListService } from "./movies-list.service";
import { RouterTestingModule } from "@angular/router/testing";
import { DeviceDetectorService } from "ngx-device-detector";
import { DeviceDetectorMockService } from "src/mocks/libs/ngx-device-detector/device-detector-mock.service";
import { OmdbService } from "src/app/core/omdb/omdb.service";
import { OmdbMockService } from "src/mocks/core/omdb/omdb-mock.service";
import { of, Subscription, throwError } from "rxjs";
import { MoviesListDto, MovieDto } from "./movies-list-dto";
import { OMDbError } from "src/app/core/omdb/omdb-dto";
import { Router } from "@angular/router";
import { FavoriteMovieService } from "src/app/core/favorite-movie/favorite-movie.service";
import { FavoriteMovieMockService } from "src/mocks/core/favorite-movie/favorite-movie.service";

describe("MoviesListService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: DeviceDetectorService,
          useClass: DeviceDetectorMockService
        },
        {
          provide: OmdbService,
          useClass: OmdbMockService
        },
        {
          provide: FavoriteMovieService,
          useClass: FavoriteMovieMockService
        }
      ]
    })
  );

  let service: MoviesListService;

  beforeEach(() => {
    service = TestBed.get(MoviesListService);
  });

  it("deve instanciar o serviço", () => {
    expect(service).toBeTruthy();
  });

  it("deve fazer a busca depois de 500 millisegundos", fakeAsync(() => {
    const spySearch = spyOn(service, "search").and.callFake(() => {});
    service.initialize();
    tick();
    service.searchText.patchValue("teste");
    tick(500);
    expect(spySearch).toHaveBeenCalledTimes(1);
  }));

  it("não deve fazer a busca pois o valueChanges não está mais sendo observado", fakeAsync(() => {
    const spySearch = spyOn(service, "search").and.callFake(() => {});
    service.initialize();
    tick();
    service.destroy();
    tick(500);
    service.searchText.patchValue("teste");
    tick(500);
    expect(spySearch).toHaveBeenCalledTimes(0);
  }));

  it("deve fazer a busca com o termo 'OPA' e a página 1", fakeAsync(() => {
    const omdbService = TestBed.get(OmdbService);
    const spyOmdbServiceSearch = spyOn<OmdbService>(
      omdbService,
      "searchFor"
    ).and.callFake(() =>
      of({
        Response: "True",
        Search: [
          {
            Title: "Filme de teste"
          }
        ]
      })
    );

    service.initialize();
    tick();

    let movieListDto: MoviesListDto;

    service.moviesListDto$.subscribe(value => {
      movieListDto = value;
    });
    service.searchText.patchValue("OPA");
    tick(500);
    expect(spyOmdbServiceSearch).toHaveBeenCalledWith("OPA", 1);
    expect(movieListDto.response).toEqual("true");
  }));

  it("deve tratar a exceção da API ao fazer a busca", fakeAsync(() => {
    const omdbService = TestBed.get(OmdbService);
    const spyOmdbServiceSearch = spyOn<OmdbService>(
      omdbService,
      "searchFor"
    ).and.callFake(() => throwError(new Error("Algo deu errado")));

    service.initialize();
    tick();

    let movieListDto: MoviesListDto;

    service.moviesListDto$.subscribe(value => {
      movieListDto = value;
    });
    service.searchText.patchValue("OPA");
    tick(500);
    expect(spyOmdbServiceSearch).toHaveBeenCalledTimes(1);
    expect(movieListDto.response).toEqual("false");
  }));

  it("deve mapear as respostas com erro tratado da API", fakeAsync(() => {
    const omdbService = TestBed.get(OmdbService);
    const omdbError = {
      Error: "Algo deu errado",
      Response: "False"
    } as OMDbError;
    const spyOmdbServiceSearch = spyOn<OmdbService>(
      omdbService,
      "searchFor"
    ).and.returnValue(of(omdbError));

    service.initialize();
    tick();

    let movieListDto: MoviesListDto;

    service.moviesListDto$.subscribe(value => {
      movieListDto = value;
    });
    service.searchText.patchValue("OPA");
    tick(500);
    expect(spyOmdbServiceSearch).toHaveBeenCalledTimes(1);
    expect(movieListDto.response).toEqual("false");
    expect(movieListDto.error).toEqual("Algo deu errado");
  }));

  it("verifica se está mapeando as respostas com erro tratado da API", fakeAsync(() => {
    const omdbService = TestBed.get(OmdbService);
    const omdbError = {
      Error: "Algo deu errado",
      Response: "False"
    } as OMDbError;
    const spyOmdbServiceSearch = spyOn<OmdbService>(
      omdbService,
      "searchFor"
    ).and.returnValue(of(omdbError));

    service.initialize();
    tick();

    let movieListDto: MoviesListDto;

    service.moviesListDto$.subscribe(value => {
      movieListDto = value;
    });
    service.searchText.patchValue("OPA");
    tick(500);
    expect(spyOmdbServiceSearch).toHaveBeenCalledTimes(1);
    expect(movieListDto.response).toEqual("false");
    expect(movieListDto.error).toEqual("Algo deu errado");
  }));

  it("deve fazer a busca com o termo 'OPA' e a página 2", fakeAsync(() => {
    const omdbService = TestBed.get(OmdbService);
    const spyOmdbServiceSearch = spyOn<OmdbService>(
      omdbService,
      "searchFor"
    ).and.callFake(() =>
      of({
        Response: "True",
        Search: [
          {
            Title: "Filme de teste"
          }
        ],
        totalResults: 30
      })
    );

    service.initialize();
    tick();

    let movieListDto: MoviesListDto;

    service.moviesListDto$.subscribe(value => {
      movieListDto = value;
    });
    service.searchText.patchValue("OPA");
    tick(500);
    spyOmdbServiceSearch.calls.reset();
    service.showMore();
    expect(spyOmdbServiceSearch).toHaveBeenCalledWith("OPA", 2);
    expect(service.hasNext).toBeTruthy();
    expect(movieListDto.movies.length).toEqual(2);
    expect(movieListDto.response).toEqual("true");
  }));

  it("não deve fazer a busca com o termo 'OPA' e a página 2", fakeAsync(() => {
    const omdbService = TestBed.get(OmdbService);
    const spyOmdbServiceSearch = spyOn<OmdbService>(
      omdbService,
      "searchFor"
    ).and.callFake(() =>
      of({
        Response: "True",
        Search: [
          {
            Title: "Filme de teste"
          }
        ],
        totalResults: 10
      })
    );

    service.initialize();
    tick();

    let movieListDto: MoviesListDto;

    service.moviesListDto$.subscribe(value => {
      movieListDto = value;
    });
    service.searchText.patchValue("OPA");
    tick(500);
    spyOmdbServiceSearch.calls.reset();
    service.showMore();
    expect(spyOmdbServiceSearch).not.toHaveBeenCalledWith("OPA", 2);
    expect(movieListDto.movies.length).toEqual(1);
    expect(service.hasNext).toBeFalsy();
    expect(movieListDto.response).toEqual("true");
  }));

  it("deve fazer a navegação para 'movies/details", () => {
    const router = TestBed.get(Router);
    const spyRouter = spyOn(router, "navigate").and.callFake(() => of({}));
    service.desktopNavigateToMovie({
      imdbID: "1",
      favorite: true
    });
    expect(spyRouter).toHaveBeenCalledWith(["movies/details", "1"]);
  });

  it("não deve fazer a navegação para 'movies/details", () => {
    const router = TestBed.get(Router);
    const spyRouter = spyOn(router, "navigate").and.callFake(() => of({}));
    service.isDesktop = false;
    service.desktopNavigateToMovie({
      imdbID: "1",
      favorite: true
    });
    expect(spyRouter).not.toHaveBeenCalled();
  });

  it("deve fazer a navegação para 'movies/details quando for mobile", () => {
    const router = TestBed.get(Router);
    const spyRouter = spyOn(router, "navigate").and.callFake(() => of({}));
    service.mobileNavigateToMovie({
      imdbID: "1",
      favorite: true
    });
    expect(spyRouter).toHaveBeenCalledWith(["movies/details", "1"]);
  });

  it("deve chamar o método para adicionar o filme favorito na lista", () => {
    const favoriteMovieService: FavoriteMovieService = TestBed.get(
      FavoriteMovieService
    );
    spyOn(favoriteMovieService, "saveFavoriteMovie").and.callFake(() => {});

    const movieDto: MovieDto = {
      imdbID: "123",
      poster: "poster",
      title: "Favorite movie",
      year: "2020",
      favorite: false
    };

    service.addFavoriteMovie(movieDto);
    expect(movieDto.favorite).toBeTruthy();
    expect(favoriteMovieService.saveFavoriteMovie).toHaveBeenCalled();
  });

  it("deve chamar o método para removes o filme favorito na lista", () => {
    const favoriteMovieService: FavoriteMovieService = TestBed.get(
      FavoriteMovieService
    );
    spyOn(favoriteMovieService, "removeFavoriteMovie").and.callFake(() => {});

    const movieDto: MovieDto = {
      imdbID: "123",
      poster: "poster",
      title: "Favorite movie",
      year: "2020",
      favorite: false
    };

    service.removeFavoriteMovie(movieDto);
    expect(movieDto.favorite).toBeFalsy();
    expect(favoriteMovieService.removeFavoriteMovie).toHaveBeenCalled();
  });

  it("deve marcar o filme como favorito ao fazer a busca", fakeAsync(() => {
    const omdbService = TestBed.get(OmdbService);
    const spyOmdbServiceSearch = spyOn<OmdbService>(
      omdbService,
      "searchFor"
    ).and.callFake(() =>
      of({
        Response: "True",
        Search: [
          {
            Title: "Filme de teste",
            imdbID: "1"
          }
        ]
      })
    );

    const favoriteMovieService: FavoriteMovieService = TestBed.get(
      FavoriteMovieService
    );
    const moviesDto = [
      {
        imdbID: "1",
        favorite: true,
        poster: "Poster",
        title: "Filme de Teste"
      }
    ] as Array<MovieDto>;
    spyOn(favoriteMovieService, "searchAllFavoriteMovies").and.returnValue(
      moviesDto
    );

    service.initialize();
    tick();

    let movieListDto: MoviesListDto;

    service.moviesListDto$.subscribe(value => {
      movieListDto = value;
    });
    service.searchText.patchValue("OPA");
    tick(500);
    expect(spyOmdbServiceSearch).toHaveBeenCalledWith("OPA", 1);
    expect(movieListDto.response).toEqual("true");
    expect(movieListDto.movies[0].favorite).toEqual(true);
  }));

  it("não deve fazer a busca quando o termo for vazio", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    spyOn(omdbService, "searchFor");
    let movieDto: MoviesListDto;
    service.moviesListDto$.subscribe(response => {
      movieDto = response;
    });
    service.search("", "1");
    tick();
    expect(omdbService.searchFor).not.toHaveBeenCalled();
    expect(movieDto).toEqual({ response: 'false', movies: []});

  }));
});
