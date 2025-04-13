// app.routes.ts
import { Route } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Route[] = [
  { path: '', component: RegisterComponent },
  // Ajoute d'autres routes ici si nécessaire
];
