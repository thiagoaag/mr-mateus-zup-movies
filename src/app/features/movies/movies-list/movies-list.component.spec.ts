import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MoviesListComponent } from "./movies-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MoviesListService } from "./movies-list.service";
import { MoviesListMockService } from "src/mocks/features/movies/movies-list/movies-list-mock.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from '@angular/router/testing';

describe("MoviesListComponent", () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesListComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        {
          provide: MoviesListService,
          useClass: MoviesListMockService
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("deve instanciar o component", () => {
    expect(component).toBeTruthy();
  });

  it("deve chamar a inicialização do serviço", () => {
    const moviesListService: MoviesListService = TestBed.get(MoviesListService);
    const initializeSpy = spyOn(
      moviesListService,
      "initialize"
    ).and.callFake(() => {});
    component.ngOnInit();
    expect(initializeSpy).toHaveBeenCalledTimes(1);
  });

  it("deve chamar o destroy do serviço", () => {
    const moviesListService: MoviesListService = TestBed.get(MoviesListService);
    const destroySpy = spyOn(
      moviesListService,
      "destroy"
    ).and.callFake(() => {});
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalledTimes(1);
  });
});
