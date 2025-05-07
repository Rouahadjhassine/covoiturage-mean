import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { PassegerprofileComponent } from './profile/passegerprofile/passegerprofile.component';
import { RechercheTrajetComponent } from './recherchetrajet/recherchetrajet.component';
import { RegisterComponent } from './auth/register/register.component';
import { CarpoolingCalculatorComponent } from './carpooling-calculator/carpooling-calculator.component';
import { FiltretrajetComponent } from './filtretrajet/filtretrajet.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, data: { isloginpage: true } },
  {
    path: 'register',
    component: RegisterComponent,
    data: { isloginpage: true },
  },
  { path: 'profile', component: PassegerprofileComponent },
  { path: 'recherche', component: RechercheTrajetComponent },
  { path: 'register', component: RegisterComponent ,data: { isloginpage: true } },
  { path: 'carpooling', component: CarpoolingCalculatorComponent },
  { path: 'filtre', component: FiltretrajetComponent },
  { path: 'profilepassager', component: ProfileComponent },
];
