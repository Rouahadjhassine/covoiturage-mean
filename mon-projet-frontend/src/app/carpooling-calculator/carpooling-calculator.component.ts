import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-carpooling-calculator',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './carpooling-calculator.component.html',
  standalone:true,
  styleUrl: './carpooling-calculator.component.css'
})
export class CarpoolingCalculatorComponent {
  tripForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.tripForm = this.fb.group({
      depart: [''],
      arrivee: [''],
      dateDepart: [''],
      dateArrivee: [''],
      passagers: [2]
    });
  }

  publishTrip(): void {
    console.log('🟢 Formulaire soumis'); // ← Ajoute ceci
    const formData = this.tripForm.value;
  
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: token || '',
      'Content-Type': 'application/json'
    });
  
    this.http.post('http://localhost:5000/api/trajets/publier', formData, { headers })
      .subscribe({
        next: (res) => {
          console.log('✅ Trajet publié avec succès', res);
        },
        error: (err) => {
          console.error('❌ Erreur lors de la publication', err);
        }
      });
  }
  

  swapLocations(): void {
    const { depart, arrivee } = this.tripForm.value;
    this.tripForm.patchValue({
      depart: arrivee,
      arrivee: depart
    });
  }
}