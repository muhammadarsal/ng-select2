import { TestBed, inject } from '@angular/core/testing';

import { NgSelect2Service } from './ng-select2.service';

describe('NgSelect2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgSelect2Service]
    });
  });

  it('should be created', inject([NgSelect2Service], (service: NgSelect2Service) => {
    expect(service).toBeTruthy();
  }));
});
