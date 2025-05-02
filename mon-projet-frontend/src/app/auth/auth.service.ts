import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface LoginResponse {
  token: string;
  user: { email: string, role: string }; // Ajout du rôle ici
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private tokenKey = 'auth_token';
  private roleKey = 'user_role'; // Clé pour le rôle de l'utilisateur

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password });
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  // Méthode pour sauvegarder le token et le rôle dans le localStorage
  setSession(token: string, role: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.roleKey, role);
  }

  // Récupère le rôle de l'utilisateur depuis le localStorage
  getUserRole(): string | null {
    return localStorage.getItem(this.roleKey);
  }

  // Vérifie si l'utilisateur est un conducteur
  isConducteur(): boolean {
    return this.getUserRole() === 'conducteur';
  }

  // Vérifie si l'utilisateur est un passager
  isPassager(): boolean {
    return this.getUserRole() === 'passager';
  }

  // Récupère le token d'authentification
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
  }
}
