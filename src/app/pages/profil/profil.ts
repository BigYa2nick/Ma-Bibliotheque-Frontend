import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './profil.html',
  styleUrl: './profil.css',
})
export class Profil implements OnInit {
  user: any;
  empruntsLivres: any[] = [];
  empruntsTomes: any[] = [];
  message = '';
  erreur = '';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.chargerEmpruntsLivres();
    this.chargerEmpruntsTomes();
  }

  get headers() {
    return { Authorization: `Bearer ${this.authService.getToken()}` };
  }

  chargerEmpruntsLivres() {
    this.http.get<any[]>('http://localhost:3000/api/emprunts/mes-emprunts', {
      headers: this.headers
    }).subscribe({
      next: (data) => this.empruntsLivres = data,
      error: () => this.empruntsLivres = []
    });
  }

  chargerEmpruntsTomes() {
    this.http.get<any[]>('http://localhost:3000/api/emprunts/mes-tomes', {
      headers: this.headers
    }).subscribe({
      next: (data) => this.empruntsTomes = data,
      error: () => this.empruntsTomes = []
    });
  }

  rendreLivre(idEmprunt: number) {
    this.message = ''; this.erreur = '';
    this.http.put(`http://localhost:3000/api/emprunts/rendre/${idEmprunt}`, {}, {
      headers: this.headers
    }).subscribe({
      next: () => { this.message = 'Livre rendu !'; this.chargerEmpruntsLivres(); },
      error: () => this.erreur = 'Erreur lors du retour'
    });
  }

  rendreTome(idEmprunt: number) {
    this.message = ''; this.erreur = '';
    this.http.put(`http://localhost:3000/api/mangas/rendre/${idEmprunt}`, {}, {
      headers: this.headers
    }).subscribe({
      next: () => { this.message = 'Tome rendu !'; this.chargerEmpruntsTomes(); },
      error: () => this.erreur = 'Erreur lors du retour'
    });
  }

  logout() { this.authService.logout(); }
} 