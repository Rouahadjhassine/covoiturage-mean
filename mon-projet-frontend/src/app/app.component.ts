import { Component } from '@angular/core';
import { RegisterComponent } from '../app/auth/register/register.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {}

