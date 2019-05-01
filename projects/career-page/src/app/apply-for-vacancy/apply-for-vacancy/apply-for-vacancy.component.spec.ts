import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyForVacancyComponent } from './apply-for-vacancy.component';

describe('ApplyForVacancyComponent', () => {
  let component: ApplyForVacancyComponent;
  let fixture: ComponentFixture<ApplyForVacancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyForVacancyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyForVacancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
