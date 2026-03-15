import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mangas } from './mangas';

describe('Mangas', () => {
  let component: Mangas;
  let fixture: ComponentFixture<Mangas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mangas],
    }).compileComponents();

    fixture = TestBed.createComponent(Mangas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
