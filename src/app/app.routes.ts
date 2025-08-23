import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ParentComponent } from './components/parent/parent.component';
import { Child1Component } from './components/child-1/child-1.component';
import { Child2Component } from './components/child-2/child-2.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';

export const routes: Routes = [
    { path: '',pathMatch : 'full',component : LoginComponent },
    { path: 'login',component : LoginComponent },
    { path: 'home',component : HomeComponent },
    { path: 'parent',component : ParentComponent },
    { path: 'childOne',component : Child1Component },
    { path: 'homeTwo',component : Child2Component },
    { path: 'about',component : AboutComponent },
    { path: 'contact',component : ContactComponent },
];
