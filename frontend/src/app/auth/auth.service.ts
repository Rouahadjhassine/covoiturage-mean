import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';  // Assurez-vous d'avoir la bonne URL

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;  // L'URL de ton backend (API)

  constructor(private http: HttpClient) {}

  // Inscription
  register(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/api/auth/register`, body);
  }

  // Connexion
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/api/auth/login`, body);
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Récupérer le token JWT
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Se déconnecter
  logout(): void {
    localStorage.removeItem('token');
  }
}
