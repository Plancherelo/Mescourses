import { TestBed } from '@angular/core/testing';

import { ManageMainListService } from './manage-main-list.service';

describe('ManageMainListService', () => {
  let service: ManageMainListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageMainListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
