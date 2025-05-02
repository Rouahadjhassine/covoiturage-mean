import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
successMessage = ''
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.tripForm = this.fb.group({
      depart: ['', Validators.required],
      arrivee: ['', Validators.required],
      dateDepart: ['', Validators.required],
      dateArrivee: ['', Validators.required],
      passagers: [2, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  publishTrip(): void {
    console.log('🟢 Formulaire soumis'); // ← Ajoute ceci
    const rawForm = this.tripForm.value;
    const formData = {
      ...rawForm,
      dateDepart: this.formatDate(rawForm.dateDepart),
      dateArrivee: this.formatDate(rawForm.dateArrivee),
    };
  
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json'
    });
    
  
    this.http.post('http://localhost:5000/api/trajets/publier', formData, { headers })
      .subscribe({
        next: (res) => {
          console.log('✅ Trajet publié avec succès', res);
          this.successMessage = 'Trajet publié avec succès ! 🎉';
          setTimeout(() => {
            this.successMessage = '';
          }, 4000);
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
  private formatDate(dateString: string): string {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    const hours = this.padZero(date.getHours());
    const minutes = this.padZero(date.getMinutes());

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  private padZero(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}