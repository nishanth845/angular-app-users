import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../app/components/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('../app/components/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('../app/components/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'calculator',
    loadComponent: () =>
      import('../app/components/loan-calculator/loan-calculator.component').then(m => m.LoanCalculatorComponent),
  },
  {
    path: 'loan-form',
    loadComponent: () =>
      import('../app/components/loan-form/loan-form.component').then(m => m.LoanFormComponent),
  }
];

