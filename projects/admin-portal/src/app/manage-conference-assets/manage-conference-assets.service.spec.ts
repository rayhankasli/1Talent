import { TestBed } from '@angular/core/testing';

import { ManageConferenceAssetsService } from './manage-conference-assets.service';

describe('ManageConferenceAssetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageConferenceAssetsService = TestBed.get(ManageConferenceAssetsService);
    expect(service).toBeTruthy();
  });
});
