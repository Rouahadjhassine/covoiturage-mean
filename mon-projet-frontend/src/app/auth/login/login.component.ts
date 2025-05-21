import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  logindata() {
    this.submitted = true;
    this.errorMessage = '';
    
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    this.authService.login(loginData.email, loginData.password).subscribe({
      next: (response) => {
        // Sauvegarder le token, le rôle, l'email et le nom
        this.authService.setSession(
          response.token,
          response.user.role,
          response.user.email,
          response.user.name || response.user.email.split('@')[0] // Utilise le nom ou le début de l'email
        );

        // Message de bienvenue selon le rôle
        if (response.user.role === 'admin') {
          this.successMessage = 'Bienvenue admin 👑';
        } else if (response.user.role === 'conducteur') {
          this.successMessage = 'Bienvenue conducteur 🚗';
        } else if (response.user.role === 'passager') {
          this.successMessage = `Bienvenue ${response.user.email} 🧍‍♂️`;
        }

        // Redirection vers la page d'accueil
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Erreur lors de la connexion:', error);
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    });
  }
}
