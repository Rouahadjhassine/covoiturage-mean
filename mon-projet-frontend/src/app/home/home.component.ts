import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ à ajouter

@Component({
  selector: 'app-home',
  standalone: true, // ✅ si tu es en mode standalone (Angular 17+)
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule], // ✅ ajoute ceci
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

  nextSlide() {
    const el = this.slider?.nativeElement;
    if (el) el.scrollBy({ left: 320, behavior: 'smooth' });
  }

  prevSlide() {
    const el = this.slider?.nativeElement;
    if (el) el.scrollBy({ left: -320, behavior: 'smooth' });
  }
}
