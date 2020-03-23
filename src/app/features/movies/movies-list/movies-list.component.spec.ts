import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from "@angular/core/testing";

import { MoviesListComponent } from "./movies-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MoviesListService } from "./movies-list.service";
import { MoviesListMockService } from "src/mocks/features/movies/movies-list/movies-list-mock.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Router, NavigationEnd } from "@angular/router";

describe("MoviesListComponent", () => {
  const eventsSub = new BehaviorSubject<any>(null);
  const routerStub = {
    events: eventsSub
  };
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesListComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: MoviesListService,
          useClass: MoviesListMockService
        },
        {
          provide: Router,
          useValue: routerStub
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

  it("deve chamar método de busca quando o evento navigationEnd acontecer", fakeAsync(() => {
    component.ngOnInit();
    fixture.detectChanges();
    tick();
    const moviesListService: MoviesListService = TestBed.get(MoviesListService);
    spyOn(moviesListService, "search").and.callFake(() => {});
    const homeNav = new NavigationEnd(1, "home", "home");
    eventsSub.next(homeNav);
    fixture.detectChanges();
    tick();
    expect(moviesListService.search).toHaveBeenCalled();
  }));
});
