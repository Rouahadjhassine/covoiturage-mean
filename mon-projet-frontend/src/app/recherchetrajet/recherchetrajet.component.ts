import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recherchetrajet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherchetrajet.component.html',
  styleUrl: './recherchetrajet.component.css',
})
export class RechercheTrajetComponent {
  todayDate: string = new Date().toISOString().split('T')[0];

  departure: string = '';
  destination: string = '';
  travelDate: string = this.todayDate;

  passengerCount: number = 1;
  showPassengerDropdown: boolean = false;

  togglePassengerDropdown() {
    this.showPassengerDropdown = !this.showPassengerDropdown;
  }

  // Nouvelle méthode pour empêcher la fermeture lors du clic sur un bouton
  handlePassengerDropdownClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.closest('button')) {
      return;
    }
    this.togglePassengerDropdown();
  }

  incrementPassenger(count: number = 1) {
    if (this.passengerCount + count <= 10) {
      this.passengerCount += count;
    } else {
      this.passengerCount = 10;
    }
  }

  decrementPassenger() {
    if (this.passengerCount > 1) {
      this.passengerCount--;
    }
  }

  isToday(): boolean {
    return this.travelDate === this.todayDate;
  }

  onSearch() {
    if (!this.departure || !this.destination || !this.travelDate) {
      alert('Veuillez remplir les champs Départ, Destination et Date.');
      return;
    }

    console.log('Recherche envoyée :', {
      departure: this.departure,
      destination: this.destination,
      date: this.travelDate,
      passengers: this.passengerCount,
    });

    // Exemple de redirection :
    // this.router.navigate(['/recherche-resultats'], { queryParams: { ... } });
  }
}
