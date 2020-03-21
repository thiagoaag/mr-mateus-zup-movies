import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MoviesListContainerComponent } from "./movies-list.container";

describe("MoviesListComponent", () => {
  let component: MoviesListContainerComponent;
  let fixture: ComponentFixture<MoviesListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesListContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
