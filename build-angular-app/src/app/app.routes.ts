import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ParentComponent } from './parent/parent.component';
import { Child1Component } from './child-1/child-1.component';
import { Child2Component } from './child-2/child-2.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '',pathMatch : 'full',component : LoginComponent },
    { path: 'login',component : LoginComponent },
    { path: 'home',component : HomeComponent },
    { path: 'parent',component : ParentComponent },
    { path: 'childOne',component : Child1Component },
    { path: 'homeTwo',component : Child2Component }
];
