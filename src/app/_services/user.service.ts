// angular
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// rxjs
import { take } from 'rxjs/operators';
// app
import { User } from '../_models/user.model';
import { CrudService } from './crud.service';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
}

@Injectable()
export class UserService extends CrudService<User> {  
  
  private readonly API = `${environment.API}user`;  
  list: User[];
  formData: User;
  
  constructor(protected http:HttpClient) {
    super(http, `${environment.API}user`);
  }

  refreshList(){
    this.getAll().toPromise().then(res => this.list = res as User[]);
  }

    resetForm(form?:NgForm){    
    if(form!=null)
      form.form.reset();    
 
    this.formData = {      
      id:0,
      username:'',
      password:'',
      email:'',
      token:'',      
    }  
    this.nomeFocus();
  }

  nomeFocus(){
    var input = document.getElementsByName("username")[0];
    input.focus();
  }
}