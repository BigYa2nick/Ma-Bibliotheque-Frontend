import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MangasService } from '../../services/mangas';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-mangas',
  imports: [CommonModule, RouterLink],
  templateUrl: './mangas.html',
  styleUrl: './mangas.css',
})
export class Mangas implements OnInit {
  mangas: any[] = [];
  mangasFiltres: any[] = [];
  loading = true;
  user: any;

  constructor(
    private mangasService: MangasService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.mangasService.getAll().subscribe({
      next: (data) => {
        this.mangas = data;
        this.mangasFiltres = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  filtrer(event: any) {
    const terme = event.target.value.toLowerCase();
    this.mangasFiltres = this.mangas.filter(m =>
      m.TITRE.toLowerCase().includes(terme) ||
      m.AUTEUR.toLowerCase().includes(terme)
    );
  }

  logout() { this.authService.logout(); }
}