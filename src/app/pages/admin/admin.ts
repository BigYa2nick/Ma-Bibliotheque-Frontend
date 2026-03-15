import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  users: any[] = [];
  livres: any[] = [];
  mangas: any[] = [];
  onglet = 'catalogue';
  message = '';

  nouveauLivre = { titre: '', annee: null, resume: '', image_url: '', id_type: 1, id_auteur: 1 };
  nouveauManga = { titre: '', auteur: '', genre: '', description: '', image_url: '' };
  nouveauTome = { manga_id: null, numero: null, titre: '' };

  imageFileLivre: File | null = null;
  imageFileManga: File | null = null;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isAdmin()) { this.router.navigate(['/livres']); return; }
    this.chargerLivres();
    this.chargerUsers();
    this.chargerMangas();
  }

  get headers() {
    return { Authorization: `Bearer ${this.authService.getToken()}` };
  }

  chargerLivres() {
    this.http.get<any[]>('http://localhost:3000/api/livres').subscribe(data => this.livres = data);
  }

  chargerUsers() {
    this.http.get<any[]>('http://localhost:3000/api/users', { headers: this.headers }).subscribe(data => this.users = data);
  }

  chargerMangas() {
    this.http.get<any[]>('http://localhost:3000/api/mangas').subscribe(data => this.mangas = data);
  }

  onFileLivreSelected(event: any) { this.imageFileLivre = event.target.files[0]; }
  onFileMangaSelected(event: any) { this.imageFileManga = event.target.files[0]; }

  ajouterLivre() {
    if (this.imageFileLivre) {
      const formData = new FormData();
      formData.append('image', this.imageFileLivre);
      this.http.post<any>('http://localhost:3000/api/upload', formData, { headers: this.headers })
        .subscribe({ next: (res) => { this.nouveauLivre.image_url = res.url; this.soumettreLivre(); } });
    } else { this.soumettreLivre(); }
  }

  soumettreLivre() {
    this.http.post('http://localhost:3000/api/livres', this.nouveauLivre, { headers: this.headers })
      .subscribe({
        next: () => { this.message = 'Livre ajouté !'; this.chargerLivres(); this.nouveauLivre = { titre: '', annee: null, resume: '', image_url: '', id_type: 1, id_auteur: 1 }; this.imageFileLivre = null; },
        error: () => this.message = 'Erreur lors de l\'ajout'
      });
  }

  supprimerLivre(id: number) {
    if (!confirm('Supprimer ce livre ?')) return;
    this.http.delete(`http://localhost:3000/api/livres/${id}`, { headers: this.headers })
      .subscribe({ next: () => { this.message = 'Livre supprimé !'; this.chargerLivres(); } });
  }

  ajouterManga() {
    if (this.imageFileManga) {
      const formData = new FormData();
      formData.append('image', this.imageFileManga);
      this.http.post<any>('http://localhost:3000/api/upload', formData, { headers: this.headers })
        .subscribe({ next: (res) => { this.nouveauManga.image_url = res.url; this.soumettreMAnga(); } });
    } else { this.soumettreMAnga(); }
  }

  soumettreMAnga() {
    this.http.post('http://localhost:3000/api/mangas', this.nouveauManga, { headers: this.headers })
      .subscribe({
        next: () => { this.message = 'Manga ajouté !'; this.chargerMangas(); this.nouveauManga = { titre: '', auteur: '', genre: '', description: '', image_url: '' }; this.imageFileManga = null; },
        error: () => this.message = 'Erreur lors de l\'ajout'
      });
  }

  supprimerManga(id: number) {
    if (!confirm('Supprimer ce manga et tous ses tomes ?')) return;
    this.http.delete(`http://localhost:3000/api/mangas/${id}`, { headers: this.headers })
      .subscribe({ next: () => { this.message = 'Manga supprimé !'; this.chargerMangas(); } });
  }

  ajouterTome() {
    this.http.post(`http://localhost:3000/api/mangas/${this.nouveauTome.manga_id}/tomes`, this.nouveauTome, { headers: this.headers })
      .subscribe({
        next: () => { this.message = 'Tome ajouté !'; this.chargerMangas(); this.nouveauTome = { manga_id: null, numero: null, titre: '' }; },
        error: () => this.message = 'Erreur lors de l\'ajout'
      });
  }

  toggleRole(id: number) {
    this.http.put(`http://localhost:3000/api/users/role/${id}`, {}, { headers: this.headers })
      .subscribe({ next: () => { this.message = 'Rôle mis à jour !'; this.chargerUsers(); } });
  }
  livreEnEdition: any = null;
mangaEnEdition: any = null;

editerLivre(livre: any) {
  this.livreEnEdition = { ...livre };
}

annulerEditionLivre() {
  this.livreEnEdition = null;
}

sauvegarderLivre() {
  this.http.put(`http://localhost:3000/api/livres/${this.livreEnEdition.LIVRE_ID}`,
    {
      titre: this.livreEnEdition.TITRE,
      annee: this.livreEnEdition.ANNEE,
      resume: this.livreEnEdition.RESUME,
      image_url: this.livreEnEdition.IMAGE_URL
    },
    { headers: this.headers }
  ).subscribe({
    next: () => {
      this.message = 'Livre modifié !';
      this.livreEnEdition = null;
      this.chargerLivres();
    },
    error: () => this.message = 'Erreur modification'
  });
}

editerManga(manga: any) {
  this.mangaEnEdition = { ...manga };
}

annulerEditionManga() {
  this.mangaEnEdition = null;
}

sauvegarderManga() {
  this.http.put(`http://localhost:3000/api/mangas/${this.mangaEnEdition.MANGA_ID}`,
    {
      titre: this.mangaEnEdition.TITRE,
      auteur: this.mangaEnEdition.AUTEUR,
      genre: this.mangaEnEdition.GENRE,
      description: this.mangaEnEdition.DESCRIPTION,
      image_url: this.mangaEnEdition.IMAGE_URL
    },
    { headers: this.headers }
  ).subscribe({
    next: () => {
      this.message = 'Manga modifié !';
      this.mangaEnEdition = null;
      this.chargerMangas();
    },
    error: () => this.message = 'Erreur modification'
  });
}

  logout() { this.authService.logout(); }
}