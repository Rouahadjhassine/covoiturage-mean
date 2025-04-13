import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { RegisterComponent } from './auth/register/register.component';
// Importer AppComponent comme standalone
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    // Ne pas ajouter AppComponent ici
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RegisterComponent,  // Ajouter ici si tu veux utiliser ce composant
  ],
  providers: [],
  // Retirer AppComponent de bootstrap ici
})
export class AppModule { }
