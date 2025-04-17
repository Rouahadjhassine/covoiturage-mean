import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { PassegerprofileComponent } from './profile/passegerprofile/passegerprofile.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent, data: { isloginpage: true } },
  { path: 'profile', component: PassegerprofileComponent },
];
