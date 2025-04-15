import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:5000/api/auth/register', this.user)
      .subscribe({
        next: (res) => {
          console.log('✅ Utilisateur inscrit avec succès', res);
          alert('Inscription réussie !');
        },
        error: (err) => {
          console.error('❌ Erreur lors de l\'inscription', err);
          alert('Erreur : ' + (err?.error?.message || 'Inconnue'));
        }
      });
  }
}