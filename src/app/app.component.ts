import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { HeaderComponent } from './components/header/header.component';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Recent Angular Features';
  showHeader = true;
  constructor(private router : Router) {
    this.router.events.subscribe(event => {
      console.log(event);
      if (event instanceof NavigationEnd) {
        // Hide header on login route
        this.showHeader = event.url !== '/login';
      }
    });
  }
}
