import { Component } from '@angular/core';
import { Child1Component } from '../child-1/child-1.component';
import { Child2Component } from '../child-2/child-2.component';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Child1Component,Child2Component],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private loginService : LoginService){

  }
  ngOnInit(){
    console.log('hi');
    this.loginService.getUserList().subscribe((res:any)=>{
      console.log(res);
    });
  }
}
