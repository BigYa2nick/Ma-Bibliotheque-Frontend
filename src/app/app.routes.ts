import { Routes } from '@angular/router';
import { Accueil } from './pages/accueil/accueil';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Livres } from './pages/livres/livres';
import { Profil } from './pages/profil/profil';
import { Admin } from './pages/admin/admin';
import { AuthGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/admin-guard';
import { Mangas } from './pages/mangas/mangas';
import { MangaDetail } from './pages/manga-detail/manga-detail';

export const routes: Routes = [
  { path: '', component: Accueil },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'livres', component: Livres, canActivate: [AuthGuard] },
  { path: 'profil', component: Profil, canActivate: [AuthGuard] },
  { path: 'admin', component: Admin, canActivate: [AuthGuard, AdminGuard] },
  { path: 'mangas', component: Mangas, canActivate: [AuthGuard] },
  { path: 'mangas/:id', component: MangaDetail, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];