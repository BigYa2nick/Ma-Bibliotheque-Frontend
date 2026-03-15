import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LivresService } from '../../services/livres';
import { AuthService } from '../../services/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-livres',
  imports: [CommonModule, RouterLink],
  templateUrl: './livres.html',
  styleUrl: './livres.css',
})
export class Livres implements OnInit {
  livres: any[] = [];
  livresFiltres: any[] = [];
  loading = true;
  user: any;
  message = '';
  erreur = '';

  constructor(
    private livresService: LivresService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.livresService.getAll().subscribe({
      next: (data) => {
        this.livres = data;
        this.livresFiltres = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  filtrer(event: any) {
    const terme = event.target.value.toLowerCase();
    this.livresFiltres = this.livres.filter(l =>
      l.TITRE.toLowerCase().includes(terme) ||
      l.AUTEUR.toLowerCase().includes(terme)
    );
  }

  emprunter(livreId: number) {
    this.message = '';
    this.erreur = '';
    const token = this.authService.getToken();
    this.http.post<any>('http://localhost:3000/api/emprunts/emprunter',
      { livre_id: livreId },
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe({
      next: (res) => this.message = res.message,
      error: (err) => this.erreur = err.error?.message || 'Erreur'
    });
  }

  logout() { this.authService.logout(); }
}