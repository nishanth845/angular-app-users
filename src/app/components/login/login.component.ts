import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from '../interfaces/data-structure.interface';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,MatCardModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData: LoginForm = {
    email: '',
    password: ''
  };

  constructor(private loginService : LoginService ,private route:Router,
    private toasterService : ToasterService
  ){

  }
  ngOnInit(){

  }
  onSubmit(){
    console.log('Form Submitted:', this.loginData);
    if(this.loginData?.email?.length >0 && this.loginData?.password?.length>0 ){
      this.loginService.submitLoginForm(this.loginData).subscribe({
        next: (res: any) => {
          if (res) {
            console.log(res);
            localStorage.setItem('token',res.token);
            this.toasterService.showMessage('Success','User Logged In Succesfully..!');
            this.route.navigateByUrl(`/home`);
          } else {
            this.toasterService.showMessage('Failure','Login Failed, Please try again after sometime.');
            this.route.navigateByUrl(`/login`);
          }
        },
        error: (err: any) => {
          console.error('Login Error:', err);
          this.toasterService.showMessage('Failure',err.error.error);
        }
      });
    }
  }
}
