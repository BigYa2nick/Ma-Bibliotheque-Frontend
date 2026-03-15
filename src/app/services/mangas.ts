import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class MangasService {

  private apiUrl = 'http://localhost:3000/api/mangas';

  constructor(private http: HttpClient, private authService: AuthService) {}

  get headers() {
    return { Authorization: `Bearer ${this.authService.getToken()}` };
  }

  getAll() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTomes(mangaId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/${mangaId}/tomes`, { headers: this.headers });
  }

  emprunter(tomeId: number) {
    return this.http.post<any>(`${this.apiUrl}/emprunter`, { tome_id: tomeId }, { headers: this.headers });
  }

  rendre(empruntId: number) {
    return this.http.put<any>(`${this.apiUrl}/rendre/${empruntId}`, {}, { headers: this.headers });
  }
}