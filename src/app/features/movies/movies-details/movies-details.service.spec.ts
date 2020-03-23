import { TestBed, fakeAsync, tick } from "@angular/core/testing";

import { MoviesDetailsService } from "./movies-details.service";
import { OmdbService } from "src/app/core/omdb/omdb.service";
import { OmdbMockService } from "src/mocks/core/omdb/omdb-mock.service";
import { FavoriteMovieService } from "src/app/core/favorite-movie/favorite-movie.service";
import { FavoriteMovieMockService } from "src/mocks/core/favorite-movie/favorite-movie.service";
import { CommonModule, Location } from "@angular/common";
import { LocationMock } from "src/mocks/@angular/common/location-mock";
import { OMDbMovieDto } from "src/app/core/omdb/omdb-dto";
import { of } from "rxjs";
import { MoviesDetailDto } from "./movies-detail-dto";

describe("MoviesDetailsService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        MoviesDetailsService,
        {
          provide: OmdbService,
          useClass: OmdbMockService
        },
        {
          provide: FavoriteMovieService,
          useClass: FavoriteMovieMockService
        },
        {
          provide: Location,
          useClass: LocationMock
        }
      ]
    })
  );

  let service: MoviesDetailsService;

  beforeEach(() => {
    service = TestBed.get(MoviesDetailsService);
  });

  it("deve instanciar o serviço", () => {
    expect(service).toBeTruthy();
  });

  it("deve buscar o detalhe do movie pelo id", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    const omdbMovieDto: OMDbMovieDto = {
      imdbID: "123",
      Ratings: [
        {
          Source: "whatsapp",
          Value: "1"
        }
      ]
    };
    spyOn(omdbService, "findById").and.returnValue(of(omdbMovieDto));
    let moviesDetailDto: MoviesDetailDto;
    service.movieDetailsDto$.subscribe(movie => {
      moviesDetailDto = movie;
    });
    service.findById("123");
    tick();
    expect(moviesDetailDto).toBeTruthy();
    expect(moviesDetailDto.favorite).toBeFalsy();
  }));

  it("deve buscar o detalhe do movie pelo id e marcar como favorito", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    const favoriteMovieService: FavoriteMovieService = TestBed.get(
      FavoriteMovieService
    );
    const omdbMovieDto: OMDbMovieDto = {
      imdbID: "123",
      Ratings: [
        {
          Source: "whatsapp",
          Value: "1"
        }
      ]
    };
    spyOn(omdbService, "findById").and.returnValue(of(omdbMovieDto));
    spyOn(favoriteMovieService, "searchByImdbId").and.returnValue({
      imdbID: "123",
      favorite: true
    });
    let moviesDetailDto: MoviesDetailDto;
    service.movieDetailsDto$.subscribe(movie => {
      moviesDetailDto = movie;
    });
    service.findById("123");
    tick();
    expect(moviesDetailDto).toBeTruthy();
    expect(moviesDetailDto.favorite).toBeTruthy();
  }));

  it("deve retornar uma lista de atores vazia pois não há informação", () => {
    const cast = service.getCast();
    expect(cast.length).toEqual(0);
  });

  it("deve retornar uma lista com 2 atores", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    const omdbMovieDto: OMDbMovieDto = {
      imdbID: "123",
      Ratings: [
        {
          Source: "whatsapp",
          Value: "1"
        }
      ],
      Actors: "Zica, Corona"
    };
    spyOn(omdbService, "findById").and.returnValue(of(omdbMovieDto));
    let moviesDetailDto: MoviesDetailDto;
    service.movieDetailsDto$.subscribe(movie => {
      moviesDetailDto = movie;
    });
    service.findById("123");
    tick();
    const cast = service.getCast();

    expect(cast.length).toEqual(2);
  }));

  it("deve retornar uma lista de generos pois não há informação de generos", () => {
    const cast = service.getGenres();
    expect(cast.length).toEqual(0);
  });

  it("deve retornar uma lista com 2 generos", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    const omdbMovieDto: OMDbMovieDto = {
      imdbID: "123",
      Ratings: [
        {
          Source: "whatsapp",
          Value: "1"
        }
      ],
      Actors: "Zica, Corona",
      Genre: "Horro,Apocalipse"
    };
    spyOn(omdbService, "findById").and.returnValue(of(omdbMovieDto));
    let moviesDetailDto: MoviesDetailDto;
    service.movieDetailsDto$.subscribe(movie => {
      moviesDetailDto = movie;
    });
    service.findById("123");
    tick();
    const genres = service.getGenres();

    expect(genres.length).toEqual(2);
  }));

  it("deve retornar uma lista de diretores  pois não há informação de diretores", () => {
    const cast = service.getDirectors();
    expect(cast.length).toEqual(0);
  });

  it("deve retornar uma lista com 2 diretores", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    const omdbMovieDto: OMDbMovieDto = {
      imdbID: "123",
      Ratings: [
        {
          Source: "whatsapp",
          Value: "1"
        }
      ],
      Actors: "Zica, Corona",
      Genre: "Horro,Apocalipse",
      Director: "Martin Scorse, Felipe Castanhari"
    };
    spyOn(omdbService, "findById").and.returnValue(of(omdbMovieDto));
    let moviesDetailDto: MoviesDetailDto;
    service.movieDetailsDto$.subscribe(movie => {
      moviesDetailDto = movie;
    });
    service.findById("123");
    tick();
    const directors = service.getDirectors();

    expect(directors.length).toEqual(2);
  }));

  it("deve buscar o rating da IMDb", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    const omdbMovieDto: OMDbMovieDto = {
      imdbID: "123",
      Ratings: [
        {
          Source: "Internet Movie Database",
          Value: "1"
        }
      ],
      Actors: "Zica, Corona",
      Genre: "Horror,Apocalipse",
      Director: "Martin Scorse, Felipe Castanhari"
    };
    spyOn(omdbService, "findById").and.returnValue(of(omdbMovieDto));
    let moviesDetailDto: MoviesDetailDto;
    service.movieDetailsDto$.subscribe(movie => {
      moviesDetailDto = movie;
    });
    service.findById("123");
    tick();
    const imdbRating = service.getImdb();

    expect(imdbRating).toEqual("1");
  }));

  it("deve buscar o rating da Rotten Tomatoes", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    const omdbMovieDto: OMDbMovieDto = {
      imdbID: "123",
      Ratings: [
        {
          Source: "Rotten Tomatoes",
          Value: "1"
        }
      ],
      Actors: "Ebola, Gripe Espanhola",
      Genre: "Horror,Apocalipse",
      Director: "Martin Scorse, Felipe Castanhari"
    };
    spyOn(omdbService, "findById").and.returnValue(of(omdbMovieDto));
    let moviesDetailDto: MoviesDetailDto;
    service.movieDetailsDto$.subscribe(movie => {
      moviesDetailDto = movie;
    });
    service.findById("123");
    tick();
    const rottenTomatoesRating = service.getRoten();

    expect(rottenTomatoesRating).toEqual("1");
  }));

  it("deve retornar 'N/A' quando o rating não for imdb ou rotten tomatoes", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    const omdbMovieDto: OMDbMovieDto = {
      imdbID: "123",
      Actors: "Ebola, Gripe Espanhola",
      Genre: "Horror,Apocalipse",
      Director: "Martin Scorse, Felipe Castanhari",
      Ratings: [
        {
          Source: "Omelete",
          Value: "10"
        }
      ]
    };
    spyOn(omdbService, "findById").and.returnValue(of(omdbMovieDto));
    let moviesDetailDto: MoviesDetailDto;
    service.movieDetailsDto$.subscribe(movie => {
      moviesDetailDto = movie;
    });
    service.findById("123");
    tick();
    const rottenTomatoesRating = service.getRoten();

    expect(rottenTomatoesRating).toEqual("N/A");
  }));

  it("deve retornar 'N/A' pois não há rating disponível", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    const omdbMovieDto: OMDbMovieDto = {
      imdbID: "123",
      Actors: "Ebola, Gripe Espanhola",
      Genre: "Horror,Apocalipse",
      Director: "Martin Scorse, Felipe Castanhari"
    };
    spyOn(omdbService, "findById").and.returnValue(of(omdbMovieDto));
    let moviesDetailDto: MoviesDetailDto;
    service.movieDetailsDto$.subscribe(movie => {
      moviesDetailDto = movie;
    });
    service.findById("123");
    tick();
    const rottenTomatoesRating = service.getRoten();

    expect(rottenTomatoesRating).toEqual("N/A");
  }));

  it("deve retornar para a página anterior", fakeAsync(() => {
    const location: Location = TestBed.get(Location);
    spyOn(location, "back").and.callFake(() => {});
    service.back();
    expect(location.back).toHaveBeenCalled();
  }));

  it("deve URL para o filme no site Imdb", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    const omdbMovieDto: OMDbMovieDto = {
      imdbID: "123",
      Title: "Extinção",
      Actors: "Ebola, Gripe Espanhola",
      Genre: "Horror,Apocalipse",
      Director: "Martin Scorse, Felipe Castanhari"
    };
    spyOn(omdbService, "findById").and.returnValue(of(omdbMovieDto));
    let moviesDetailDto: MoviesDetailDto;
    service.movieDetailsDto$.subscribe(movie => {
      moviesDetailDto = movie;
    });
    service.findById("123");
    tick();

    const url = service.getImdbUrl();
    expect(url).toEqual("https://www.imdb.com/title/123");
  }));

  it("deve URL para o filme no site rotten tomatoes", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    const omdbMovieDto: OMDbMovieDto = {
      imdbID: "123",
      Title: "Sobreviventes",
      Actors: "Ebola, Gripe Espanhola",
      Genre: "Horror,Apocalipse",
      Director: "Martin Scorse, Felipe Castanhari"
    };
    spyOn(omdbService, "findById").and.returnValue(of(omdbMovieDto));
    let moviesDetailDto: MoviesDetailDto;
    service.movieDetailsDto$.subscribe(movie => {
      moviesDetailDto = movie;
    });
    service.findById("123");
    tick();

    const url = service.getRottenTomatoesUrl();
    expect(url).toEqual(
      "https://www.rottentomatoes.com/search?search=Sobreviventes"
    );
  }));

  it("deve URL a home page do IMDB", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    const omdbMovieDto: OMDbMovieDto = {
      Title: "Sobreviventes",
      Actors: "Ebola, Gripe Espanhola",
      Genre: "Horror,Apocalipse",
      Director: "Martin Scorse, Felipe Castanhari"
    };
    spyOn(omdbService, "findById").and.returnValue(of(omdbMovieDto));
    let moviesDetailDto: MoviesDetailDto;
    service.movieDetailsDto$.subscribe(movie => {
      moviesDetailDto = movie;
    });
    service.findById("123");
    tick();

    const url = service.getImdbUrl();
    expect(url).toEqual("https://www.imdb.com");
  }));

  it("deve URL a home page do rotten tomatoes", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    const omdbMovieDto: OMDbMovieDto = {
      Actors: "Ebola, Gripe Espanhola",
      Genre: "Horror,Apocalipse",
      Director: "Martin Scorse, Felipe Castanhari"
    };
    spyOn(omdbService, "findById").and.returnValue(of(omdbMovieDto));
    let moviesDetailDto: MoviesDetailDto;
    service.movieDetailsDto$.subscribe(movie => {
      moviesDetailDto = movie;
    });
    service.findById("123");
    tick();

    const url = service.getRottenTomatoesUrl();
    expect(url).toEqual("https://www.rottentomatoes.com");
  }));

  it("deve favoritar o filme", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    const omdbMovieDto: OMDbMovieDto = {
      Actors: "Ebola, Gripe Espanhola",
      Genre: "Horror,Apocalipse",
      Director: "Martin Scorse, Felipe Castanhari"
    };
    spyOn(omdbService, "findById").and.returnValue(of(omdbMovieDto));
    let moviesDetailDto: MoviesDetailDto;
    service.movieDetailsDto$.subscribe(movie => {
      moviesDetailDto = movie;
    });
    service.findById("123");
    tick();

    const favoriteMovieService: FavoriteMovieService = TestBed.get(
      FavoriteMovieService
    );
    spyOn(favoriteMovieService, "saveFavoriteMovie").and.callFake(() => {});
    service.favoriteMovie();
    tick();
    expect(moviesDetailDto.favorite).toBeTruthy();
  }));

  it("deve desfavoritar o filme", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    const omdbMovieDto: OMDbMovieDto = {
      Actors: "Ebola, Gripe Espanhola",
      Genre: "Horror,Apocalipse",
      Director: "Martin Scorse, Felipe Castanhari"
    };
    spyOn(omdbService, "findById").and.returnValue(of(omdbMovieDto));
    let moviesDetailDto: MoviesDetailDto;
    service.movieDetailsDto$.subscribe(movie => {
      moviesDetailDto = movie;
    });

    service.findById("123");
    tick();

    const favoriteMovieService: FavoriteMovieService = TestBed.get(
      FavoriteMovieService
    );
    spyOn(favoriteMovieService, "saveFavoriteMovie").and.callFake(() => {});
    service.favoriteMovie();
    tick();
    service.favoriteMovie();
    tick();
    expect(moviesDetailDto.favorite).toBeFalsy();
  }));

  it("deve fazer buscar o filme por id quando o método initialize for chamado", fakeAsync(() => {
    const omdbService: OmdbService = TestBed.get(OmdbService);
    const omdbMovieDto: OMDbMovieDto = {
      imdbID: "1",
      Title: 'Opa'
    }
    spyOn(omdbService, "findById").and.returnValue(of(omdbMovieDto));
    service.initialize("1");
    tick();
    expect(omdbService.findById).toHaveBeenCalledWith("1");
  }));
});
