import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirection vers login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
