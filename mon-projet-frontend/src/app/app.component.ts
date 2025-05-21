import { Component } from '@angular/core';
import { RegisterComponent } from '../app/auth/register/register.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, FooterComponent],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isloginpage: boolean = false;
  issignuppage: boolean = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.router.routerState.root.firstChild;

        if (
          currentRoute &&
          currentRoute.snapshot.data['isloginpage'] !== undefined
        ) {
          this.isloginpage = currentRoute.snapshot.data['isloginpage'];
        } else {
          this.isloginpage = false;
        }
      });
  }
}
