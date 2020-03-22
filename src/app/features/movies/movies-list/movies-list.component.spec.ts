import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MoviesListComponent } from "./movies-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MoviesListService } from './movies-list.service';
import { MoviesListMockService } from 'src/mocks/features/movies/movies-list/movies-list-mock.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe("MoviesListComponent", () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesListComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        {
          provide: MoviesListService,
          useClass: MoviesListMockService
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
