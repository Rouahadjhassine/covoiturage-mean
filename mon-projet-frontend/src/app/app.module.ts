import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Ajouté pour les forms template-driven
import { ReactiveFormsModule } from '@angular/forms';  // Ajouté pour les Reactive Forms
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';  // Ajouté ici si tu veux l'utiliser

@NgModule({
  declarations: [
     // N'oublie pas de déclarer ton LoginComponent ici
   // N'oublie pas de déclarer ton RegisterComponent ici aussi si nécessaire
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule  // Assure-toi que ReactiveFormsModule est bien là
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
