# MaBibliothèque — Frontend Angular

Application web de gestion de bibliothèque construite avec Angular 19 et Tailwind CSS.

## Stack technique

- **Framework** : Angular 19 (standalone components)
- **Style** : Tailwind CSS v4
- **Auth** : JWT stocké en localStorage
- **HTTP** : Angular HttpClient
- **Routing** : Angular Router avec Guards

## Fonctionnalités

- Authentification complète (login, register, logout)
- Catalogue de livres et mangas côte à côte
- Emprunt et retour de livres et de tomes de manga
- Profil utilisateur avec historique des emprunts
- Panel admin : gestion livres, mangas, tomes, utilisateurs
- Upload d'images de couverture
- Recherche en temps réel
- Score de fidélité automatique
- Guards de protection des routes (AuthGuard, AdminGuard)

## Prérequis

- Node.js 18+
- Angular CLI (`npm install -g @angular/cli`)
- API backend lancée sur `http://localhost:3000`

## Installation

```bash
# Cloner le repo
git clone https://github.com/BigYa2nick/ma-bibliotheque-frontend.git
cd ma-bibliotheque-frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npx ng serve
```

L'application sera disponible sur `http://localhost:4200`

## Structure du projet

```
src/
├── app/
│   ├── guards/
│   │   ├── auth.ts          # Protège les routes connectées
│   │   └── admin.ts         # Protège les routes admin
│   ├── pages/
│   │   ├── accueil/         # Page d'accueil publique
│   │   ├── login/           # Formulaire de connexion
│   │   ├── register/        # Formulaire d'inscription
│   │   ├── livres/          # Catalogue livres + mangas
│   │   ├── manga-detail/    # Détail d'un manga avec ses tomes
│   │   ├── profil/          # Profil utilisateur + emprunts
│   │   └── admin/           # Panel d'administration
│   ├── services/
│   │   ├── auth.ts          # Authentification JWT
│   │   ├── livres.ts        # Appels API livres
│   │   └── mangas.ts        # Appels API mangas
│   ├── app.routes.ts        # Configuration du routing
│   └── app.config.ts        # Configuration Angular
```

## Comptes de test

| Email | Mot de passe | Rôle |
|-------|-------------|------|
| admin@biblio.com | password123 | Admin |
| alice@biblio.com | password123 | User |
| fatou@biblio.com | password123 | User |

## Pages disponibles

| Route | Accès | Description |
|-------|-------|-------------|
| `/` | Public | Page d'accueil |
| `/login` | Public | Connexion |
| `/register` | Public | Inscription |
| `/livres` | Connecté | Catalogue |
| `/mangas/:id` | Connecté | Détail manga |
| `/profil` | Connecté | Mon profil |
| `/admin` | Admin | Panel admin |