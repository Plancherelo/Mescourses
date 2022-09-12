import { TestBed } from '@angular/core/testing';

import { ManageShopService } from './manage-shop.service';

describe('ManageShopService', () => {
  let service: ManageShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
