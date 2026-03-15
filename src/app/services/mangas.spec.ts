import { TestBed } from '@angular/core/testing';

import { Mangas } from './mangas';

describe('Mangas', () => {
  let service: Mangas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mangas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
