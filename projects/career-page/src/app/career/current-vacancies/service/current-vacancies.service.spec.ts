import { TestBed } from '@angular/core/testing';

import { CurrentVacanciesService } from './current-vacancies.service';

describe('CurrentVacanciesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentVacanciesService = TestBed.get(CurrentVacanciesService);
    expect(service).toBeTruthy();
  });
});
