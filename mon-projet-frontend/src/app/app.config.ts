// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { RegisterComponent } from './auth/register/register.component';

bootstrapApplication(RegisterComponent, {
  providers: [provideRouter(routes)]
}).catch(err => console.error(err));
