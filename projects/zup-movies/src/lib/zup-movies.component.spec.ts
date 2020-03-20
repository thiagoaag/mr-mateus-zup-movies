import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZupMoviesComponent } from './zup-movies.component';

describe('ZupMoviesComponent', () => {
  let component: ZupMoviesComponent;
  let fixture: ComponentFixture<ZupMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZupMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZupMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
