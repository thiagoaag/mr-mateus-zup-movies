import { TestBed } from "@angular/core/testing";
import { FavoriteMovieService } from "src/app/core/favorite-movie/favorite-movie.service";
import { MovieDto } from "src/app/features/movies/movies-list/movies-list-dto";

describe("FavoriteMovieService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [FavoriteMovieService]
    })
  );

  let service: FavoriteMovieService;
  beforeEach(() => {
    service = TestBed.get(FavoriteMovieService);
  });

  it("deve instanciar o serviço", () => {
    expect(service).toBeTruthy();
  });

  it("deve buscar todos os filme no localStorage", () => {
    const movies = [
      {
        imdbID: "1",
        favorite: true
      }
    ] as Array<MovieDto>;
    spyOn(localStorage, "getItem").and.returnValue(JSON.stringify(movies));
    const moviesSearched = service.searchAllFavoriteMovies();
    expect(moviesSearched.length).toEqual(1);
    expect(localStorage.getItem).toHaveBeenCalledWith("favorite-movies");
  });

  it("deve retornar uma lista vazia quando não há dados no localStorage", () => {
    spyOn(localStorage, "getItem").and.returnValue(undefined);
    const moviesSearched = service.searchAllFavoriteMovies();
    expect(moviesSearched.length).toEqual(0);
    expect(localStorage.getItem).toHaveBeenCalledWith("favorite-movies");
  });

  it("deve adicionar o filme no localStorage sem dados", () => {
    const movie = {
      imdbID: "1",
      favorite: true
    } as MovieDto;
    spyOn(localStorage, "setItem").and.callFake(() => {});
    service.saveFavoriteMovie(movie);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "favorite-movies",
      JSON.stringify([movie])
    );
  });

  it("deve adicionar o filme no localStorage com dados", () => {
    const movie = {
      imdbID: "1",
      favorite: true
    } as MovieDto;

    spyOn(localStorage, "getItem").and.returnValue(JSON.stringify([movie]));

    spyOn(localStorage, "setItem").and.callFake(() => {});

    const movie2 = {
      imdbID: "2",
      favorite: true
    } as MovieDto;

    service.saveFavoriteMovie(movie2);
    const movies = [
      movie,
      movie2
    ];
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "favorite-movies",
      JSON.stringify(movies)
    );
  });

  it("deve removes o filme do localStorage", () => {
    const movie = {
      imdbID: "1",
      favorite: true
    } as MovieDto;

    spyOn(localStorage, "getItem").and.returnValue(JSON.stringify([movie]));
    spyOn(localStorage, "setItem").and.callFake(() => {});

    service.removeFavoriteMovie(movie);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "favorite-movies",
      JSON.stringify([])
    );
  });

  it("deve lançar uma exceção caso não encontre o filme no localStorage", () => {
    const movie = {
      imdbID: "1",
      favorite: true
    } as MovieDto;

    spyOn(localStorage, "getItem").and.returnValue(JSON.stringify([]));
    spyOn(localStorage, "setItem").and.callFake(() => {});

    expect(() => {
      service.removeFavoriteMovie(movie);
    }).toThrowError();
  });
});
