import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MoviesDetailsComponent } from "./movies-details.component";
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MoviesDetailsService } from './movies-details.service';
import { MoviesDetailsMockService } from 'src/mocks/features/movies/movies-details/movies-details-mock.service';

describe("MoviesDetailsComponent", () => {
  let component: MoviesDetailsComponent;
  let fixture: ComponentFixture<MoviesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MoviesDetailsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: MoviesDetailsService,
          useClass: MoviesDetailsMockService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
