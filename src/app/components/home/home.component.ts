import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatButtonModule, CommonModule,
    MatButtonModule,
    MatCardModule, MatIcon, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  items:any;
  steps = [
  { icon: 'assignment', title: '1. Apply Online', desc: 'Fill out a quick online form — no paperwork required.' },
  { icon: 'verified', title: '2. Instant Approval', desc: 'Our AI checks your details and approves your loan in minutes.' },
  { icon: 'account_balance', title: '3. Quick Disbursement', desc: 'Funds are transferred directly into your bank account instantly.' },
  { icon: 'payments', title: '4. Easy Repayment', desc: 'Choose flexible EMI plans that suit your needs.' },
];
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
