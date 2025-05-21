import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

interface LoginResponse {
  token: string;
  user: { 
    email: string;
    role: string;
    name: string;
  };
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private tokenKey = 'auth_token';
  private roleKey = 'user_role';
  private userEmailKey = 'user_email';
  private userNameKey = 'user_name';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    // Initialiser l'état d'authentification au démarrage
    this.isAuthenticatedSubject.next(this.hasValidToken());
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      email,
      password,
    });
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password });
  }

  // Méthode pour sauvegarder les informations de session
  setSession(token: string, role: string, email: string, name: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.roleKey, role);
    localStorage.setItem(this.userEmailKey, email);
    localStorage.setItem(this.userNameKey, name);
    this.isAuthenticatedSubject.next(true);
  }

  // Récupérer l'email de l'utilisateur
  getUserEmail(): string | null {
    return localStorage.getItem(this.userEmailKey);
  }

  // Récupérer le nom de l'utilisateur
  getUserName(): string | null {
    return localStorage.getItem(this.userNameKey);
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

  // Méthode pour déconnecter l'utilisateur
  logout(): void {
    // Nettoyer le localStorage
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.roleKey);
    localStorage.removeItem(this.userEmailKey);
    localStorage.removeItem(this.userNameKey);
    
    // Mettre à jour l'état d'authentification
    this.isAuthenticatedSubject.next(false);
    
    // Réinitialiser les autres états si nécessaire
    localStorage.clear(); // Pour s'assurer que toutes les données de session sont supprimées
  }

  hasValidToken(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  // Récupère le token d'authentification
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
