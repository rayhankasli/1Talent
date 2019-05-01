import { TestBed } from '@angular/core/testing';

import { VacancyDetailsService } from './vacancy-details.service';

describe('VacancyDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VacancyDetailsService = TestBed.get(VacancyDetailsService);
    expect(service).toBeTruthy();
  });
});
