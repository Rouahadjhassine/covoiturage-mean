import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class HeaderComponent implements OnInit {
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const profileMenu = document.getElementById('profile-menu');
    const profileButton = document.getElementById('profile-button');
    
    if (profileMenu && profileButton) {
      if (!profileMenu.contains(event.target as Node) && 
          !profileButton.contains(event.target as Node)) {
        this.isProfileMenuOpen = false;
      }
    }
  }
  isAuthenticated = false;
  userRole: string | null = null;
  userEmail: string | null = null;
  userName: string | null = null;
  isMobileMenuOpen = false;
  isProfileMenuOpen = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Vérifier l'état initial
    this.updateAuthState();

    // S'abonner aux changements d'authentification
    this.authService.isAuthenticated$.subscribe(() => {
      this.updateAuthState();
    });
  }

  private updateAuthState() {
    this.isAuthenticated = this.authService.hasValidToken();
    this.userRole = this.authService.getUserRole();
    this.userEmail = this.authService.getUserEmail();
    this.userName = this.authService.getUserName();
    console.log('Auth state updated:', { 
      isAuthenticated: this.isAuthenticated, 
      userRole: this.userRole,
      userEmail: this.userEmail
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout() {
    // Déconnexion via le service
    this.authService.logout();
    
    // Réinitialiser les états locaux
    this.isAuthenticated = false;
    this.userRole = null;
    this.userEmail = null;
    this.userName = null;
    this.isProfileMenuOpen = false;
    
    // Redirection vers la page d'accueil
    this.router.navigate(['/Home']);
  }
}