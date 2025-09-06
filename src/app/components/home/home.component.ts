import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  items:any;
  constructor(private loginService : LoginService){

  }
  ngOnInit(){
    console.log('hi');
    this.loginService.getUserList().subscribe((res:any)=>{
      console.log(res);
      this.items = res.data;
    });
  }
}
