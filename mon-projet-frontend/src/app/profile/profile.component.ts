import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

interface UserProfile {
  name?: string;
  phone?: string;
  bio?: string;
  profileImage?: string;
}

interface Trip {
  departure: string;
  destination: string;
  date: Date;
  time: string;
  price: number;
  seats: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class ProfileComponent implements OnInit {
  userEmail: string | null = null;
  userProfile: UserProfile | null = null;
  profileImage: string | null = null;
  isEditing = false;
  profileForm: FormGroup;
  selectedTab: 'upcoming' | 'past' = 'upcoming';
  
  upcomingTrips: Trip[] = [];
  pastTrips: Trip[] = [];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [''],
      bio: [''],
    });
  }

  ngOnInit() {
    this.userEmail = this.authService.getUserEmail();
    this.loadUserProfile();
    this.loadTrips();
  }

  loadUserProfile() {
    // Simuler le chargement du profil (à remplacer par un appel API)
    const userName = this.authService.getUserName();
    this.userProfile = {
      name: userName || this.userEmail?.split('@')[0] || '',
      phone: '+33 6 12 34 56 78',
      bio: 'Passionné de voyages et de rencontres.',
      profileImage: 'assets/default-avatar.png'
    };

    if (this.userProfile) {
      this.profileForm.patchValue({
        name: this.userProfile.name,
        phone: this.userProfile.phone,
        bio: this.userProfile.bio
      });
      this.profileImage = this.userProfile.profileImage || null;
    }
  }

  loadTrips() {
    // Simuler le chargement des trajets (à remplacer par un appel API)
    this.upcomingTrips = [
      {
        departure: 'Paris',
        destination: 'Lyon',
        date: new Date('2025-06-01'),
        time: '14:30',
        price: 45,
        seats: 2
      },
      {
        departure: 'Marseille',
        destination: 'Nice',
        date: new Date('2025-06-15'),
        time: '09:00',
        price: 25,
        seats: 1
      }
    ];

    this.pastTrips = [
      {
        departure: 'Lyon',
        destination: 'Paris',
        date: new Date('2025-05-01'),
        time: '10:00',
        price: 40,
        seats: 1
      }
    ];
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.profileImage = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // Simuler la sauvegarde (à remplacer par un appel API)
      this.userProfile = {
        ...this.userProfile,
        ...this.profileForm.value
      };

      // Mettre à jour le nom dans le service d'authentification
      const token = localStorage.getItem('auth_token');
      const role = this.authService.getUserRole();
      const email = this.authService.getUserEmail();
      if (token && role && email) {
        this.authService.setSession(token, role, email, this.profileForm.value.name);
      }

      this.isEditing = false;
    }
  }
}
