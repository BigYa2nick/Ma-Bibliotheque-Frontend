import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  erreur = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.erreur = '';
    this.loading = true;

    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (res) => {
          this.authService.saveSession(res.token, res.user);
          if (res.user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/livres']);
          }
        },
        error: (err) => {
          this.erreur = err.error?.message || 'Erreur de connexion';
          this.loading = false;
        }
      });
  }
}