import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatbotComponent } from '../components/chatbot/chatbot.component';
interface Route {
  from: string;
  to: string;
  link: string;
}
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, RouterModule, FormsModule, ChatbotComponent],
})
export class HomeComponent {
  @ViewChild('testimonialSlider', { static: false }) slider!: ElementRef;

  avisConducteurs = [
    {
      nom: 'Sofien K.',
      ville: 'Ariana',
      message: 'J’ai pu partager mon trajet et faire des économies !',
    },
    {
      nom: 'Hichem R.',
      ville: 'Tunis',
      message: 'Une superbe expérience avec des passagers très ponctuels.',
    },
    {
      nom: 'Nour M.',
      ville: 'Sfax',
      message: 'Je recommande vivement cette plateforme aux conducteurs.',
    },
    {
      nom: 'Anis B.',
      ville: 'Nabeul',
      message: 'Très bonne interface et facile à gérer les trajets.',
    },
  ];

  // === SLIDER ===
  nextSlide() {
    const el = this.slider?.nativeElement;
    if (el) el.scrollBy({ left: 320, behavior: 'smooth' });
  }

  prevSlide() {
    const el = this.slider?.nativeElement;
    if (el) el.scrollBy({ left: -320, behavior: 'smooth' });
  }

  // === FORMULAIRE DE RECHERCHE ===
  todayDate: string = new Date().toISOString().split('T')[0];

  departure: string = '';
  destination: string = '';
  travelDate: string = this.todayDate; // valeur par défaut

  passengerCount: number = 1;
  showPassengerDropdown: boolean = false;

  constructor(private router: Router) {}

  togglePassengerDropdown() {
    this.showPassengerDropdown = !this.showPassengerDropdown;
  }

  incrementPassenger() {
    if (this.passengerCount < 10) {
      this.passengerCount++;
    }
  }

  decrementPassenger() {
    if (this.passengerCount > 1) {
      this.passengerCount--;
    }
  }

  onSearch() {
    if (!this.departure || !this.destination || !this.travelDate) {
      alert(
        'Veuillez remplir tous les champs obligatoires : Départ, Destination et Date.'
      );
      return;
    }

    // Rediriger si tout est ok
    this.router.navigate(['/recherche']);
  }
  popularRoutes: Route[] = [
    { from: 'Tunis', to: 'Sfax', link: '/routes/lille-paris' },
    { from: 'Tunis', to: 'Sousse', link: '/routes/paris-lille' },
    { from: 'Nabeul', to: 'Tunis', link: '/routes/grenoble-lyon' },
    { from: 'Sfax', to: 'Tunis', link: '/routes/lille-paris' },
    { from: 'Sousse', to: 'Sfax', link: '/routes/paris-lille' },
    { from: 'Nabeul', to: 'Jerba', link: '/routes/grenoble-lyon' },
  ];
}
