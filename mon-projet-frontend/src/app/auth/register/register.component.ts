// register.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Importation du module FormsModule pour la gestion des formulaires

@Component({
  selector: 'app-register',
  standalone: true, // Indication que ce composant est autonome
  imports: [FormsModule],  // Importation des modules nécessaires
  templateUrl: './register.component.html',  // Lien vers le fichier HTML
  styleUrls: ['./register.component.css']   // Lien vers le fichier CSS (facultatif)
})
export class RegisterComponent {
  // Variables pour lier les champs de formulaire
  username: string = '';
  email: string = '';
  password: string = '';
  
  // Fonction pour gérer la soumission du formulaire
  onSubmit() {
    console.log('Form submitted', this.username, this.email, this.password);
    // Ici tu peux ajouter la logique pour soumettre les données à un backend
  }
}
