// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// app
import { Login } from '../_models/login.model';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  }

@Injectable()
export class LoginService {  
  loginUrl = 'http://localhost:4726/api/login/'; 
  formData: Login;

  constructor(private http:HttpClient) { }

  login(form){      
    return this.http.post(this.loginUrl + form.username  + '/' + form.password, httpOptions);
  }

  nomeFocus(){
    var inputAutor = document.getElementsByName("username")[0];
    inputAutor.focus();
  }

}