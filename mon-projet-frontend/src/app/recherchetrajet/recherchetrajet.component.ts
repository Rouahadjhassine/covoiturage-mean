import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recherchetrajet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherchetrajet.component.html',
  styleUrls: ['./recherchetrajet.component.css'],
})
export class RechercheTrajetComponent {
  todayDate: string = new Date().toISOString().split('T')[0]; // Date d'aujourd'hui pour le min de l'input

  searchQuery: string = ''; // La requête de recherche libre
  passengerCount: number = 1; // Compte de passagers
  showPassengerDropdown: boolean = false; // Contrôle l'affichage du dropdown pour les passagers
  trajets: any[] = []; // Liste des trajets récupérés

  constructor(private http: HttpClient) {}

  // Méthode pour basculer l'affichage du dropdown des passagers
  togglePassengerDropdown() {
    this.showPassengerDropdown = !this.showPassengerDropdown;
  }

  // Méthode pour empêcher la fermeture du dropdown lorsqu'on clique sur un bouton
  handlePassengerDropdownClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    this.togglePassengerDropdown();
  }

  // Méthode pour incrémenter le nombre de passagers
  incrementPassenger(count: number = 1) {
    if (this.passengerCount + count <= 10) {
      this.passengerCount += count;
    } else {
      this.passengerCount = 10;
    }
  }

  // Méthode pour décrémenter le nombre de passagers
  decrementPassenger() {
    if (this.passengerCount > 1) {
      this.passengerCount--;
    }
  }

  // Méthode pour effectuer la recherche de trajet
  onSearch() {
    if (!this.searchQuery) {
      alert('Veuillez remplir le champ de recherche.');
      return;
    }

    // Créer la requête à envoyer au backend
    const requestPayload = {
      requete: this.searchQuery, // Utiliser la requête complète
    };

    // Envoyer la requête POST au backend
    this.http.post('http://localhost:5000/api/trajets/rechercher', requestPayload).subscribe(
      (response: any) => {
        console.log('Réponse de la recherche de trajet:', response);
        this.trajets = response.trajets; // Mettez à jour la liste des trajets avec la réponse
      },
      (error) => {
        console.error('Erreur lors de la recherche de trajet:', error);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    );
  }
}
