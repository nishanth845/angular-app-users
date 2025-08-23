import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { LoginForm } from '../../app/components/interfaces/data-structure.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = `https://reqres.in/api/`;

  imports  = [HttpClient]
  constructor(private http: HttpClient) { }

  submitLoginForm(params:LoginForm){
    const headers = new HttpHeaders().set('x-api-key','reqres-free-v1');
    return this.http.post(`${this.apiUrl}login`,params,{headers});
  }

  getUserList(){
    return this.http.get(`${this.apiUrl}users?page=2`);
  }
}
