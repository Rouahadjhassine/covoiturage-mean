import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',

  // Assure-toi que ce fichier existe bien
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  successMessage = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  logindata() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const loginData = {
      email: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    this.http
      .post<any>('http://localhost:5000/api/auth/login', loginData)
      .subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          const role = res.user?.role;
          const username = res.user?.username;
          if (role === 'admin') this.successMessage = 'Bienvenue admin 👑';
          else if (role === 'conducteur')
            this.successMessage = 'Bienvenue conducteur 🚗';
          else if (role === 'passager')
            this.successMessage = 'Bienvenue passager 🧍‍♂️';

          // Redirect to home page on successful login
          window.location.href = '/';
        },
        error: (err) => {
          console.error('Erreur lors de la connexion', err);
          this.successMessage = 'Erreur lors de la connexion';
        },
      });
  }
}
