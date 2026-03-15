import { TestBed } from '@angular/core/testing';

import { Livres } from './livres';

describe('Livres', () => {
  let service: Livres;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Livres);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
