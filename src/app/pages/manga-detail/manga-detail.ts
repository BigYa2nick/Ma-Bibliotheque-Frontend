import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MangasService } from '../../services/mangas';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-manga-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './manga-detail.html',
  styleUrl: './manga-detail.css',
})
export class MangaDetail implements OnInit {
  manga: any = null;
  tomes: any[] = [];
  loading = true;
  message = '';
  erreur = '';

  constructor(
    private route: ActivatedRoute,
    private mangasService: MangasService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.mangasService.getAll().subscribe(data => {
      this.manga = data.find(m => m.MANGA_ID === id);
    });
    this.chargerTomes(id);
  }

  chargerTomes(id: number) {
    this.mangasService.getTomes(id).subscribe({
      next: (data) => { this.tomes = data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  emprunter(tomeId: number) {
    this.message = ''; this.erreur = '';
    this.mangasService.emprunter(tomeId).subscribe({
      next: (res) => {
        this.message = res.message;
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.chargerTomes(id);
      },
      error: (err) => this.erreur = err.error?.message || 'Erreur'
    });
  }

  rendre(empruntId: number) {
    this.message = ''; this.erreur = '';
    this.mangasService.rendre(empruntId).subscribe({
      next: (res) => {
        this.message = res.message;
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.chargerTomes(id);
      },
      error: (err) => this.erreur = err.error?.message || 'Erreur'
    });
  }
}