import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { RechercheTrajetComponent } from './recherchetrajet/recherchetrajet.component';
import { RegisterComponent } from './auth/register/register.component';
import { CarpoolingCalculatorComponent } from './carpooling-calculator/carpooling-calculator.component';
import { FiltretrajetComponent } from './filtretrajet/filtretrajet.component';
import { AdminComponent } from './admin/admin.component';
import { ConducteurComponent } from './conducteur/conducteur.component';
import { ProfileComponent } from './profile/profile.component';
import { DesignRechercheComponent } from './design-recherche/design-recherche.component';
import { AvisConducteurComponent } from './avis-conducteur/avis-conducteur.component';
import { RegisterDesignComponent } from './auth/register-design/register-design.component';
import { ChatgptComponent } from './chatgpt/chatgpt.component';
import { ReservationComponent } from './reservation/reservation.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'login', component: LoginComponent, data: { isloginpage: true } },
  {
    path: 'register',
    component: RegisterComponent,
    data: { isloginpage: true },
  },

  { path: 'recherche', component: RechercheTrajetComponent },
  { path: 'carpooling', component: CarpoolingCalculatorComponent },
  { path: 'filtre', component: FiltretrajetComponent },
  { path: 'admin', component: AdminComponent, data: { isloginpage: true } },
  {
    path: 'conducteur',
    component: ConducteurComponent,
    data: { isloginpage: true },
  },
  { path: 'profilepassager', component: ProfileComponent },
  { path: 'designrecherche', component: DesignRechercheComponent },
  { path: 'chatgpt', component: ChatgptComponent },
   { path: 'reservation', component: ReservationComponent },
  { path: 'avisconducteur', component: AvisConducteurComponent },
  { path: 'register_design', component: RegisterDesignComponent, data: { isloginpage: true } },
];
