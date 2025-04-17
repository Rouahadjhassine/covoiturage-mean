import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule],
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

  // === SLIDER AVIS ===
  nextSlide() {
    const el = this.slider?.nativeElement;
    if (el) el.scrollBy({ left: 320, behavior: 'smooth' });
  }

  prevSlide() {
    const el = this.slider?.nativeElement;
    if (el) el.scrollBy({ left: -320, behavior: 'smooth' });
  }

  // === DATE D'AUJOURD'HUI ===
  todayDate: string = new Date().toISOString().split('T')[0];

  // === PASSAGER ===
  passengerCount: number = 1;
  showPassengerDropdown: boolean = false;

  togglePassengerDropdown() {
    this.showPassengerDropdown = !this.showPassengerDropdown;
  }

  incrementPassenger() {
    if (this.passengerCount < 10) {
      this.passengerCount++;
      console.log('Incrémenté à', this.passengerCount);
    }
  }

  decrementPassenger() {
    if (this.passengerCount > 1) {
      this.passengerCount--;
      console.log('Décrémenté à', this.passengerCount);
    }
  }
}
