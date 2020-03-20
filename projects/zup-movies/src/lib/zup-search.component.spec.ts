import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZupSearchComponent } from './zup-search.component';

describe('ZupSearchComponent', () => {
  let component: ZupSearchComponent;
  let fixture: ComponentFixture<ZupSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZupSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZupSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
