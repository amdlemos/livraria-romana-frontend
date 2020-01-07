// angular
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// rxjs./message.service
import { take } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
}

@Injectable()
export class CrudService<T> {  
  
  constructor(protected http:HttpClient, private API_URL: string) { }

  add(record: T) {    
    console.log(record);        
    return this.http.post<T>(this.API_URL, record, httpOptions).pipe(take(1));      
  }

  edit(record: T){    
    return this.http.put(`${this.API_URL}/${record['id']}`, record).pipe(take(1));
  }

  delete(id){   
    return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
  }

  get(id){
    return this.http.get<T>(this.API_URL, id);
  }  

  getAll(){
    return this.http.get<T[]>(this.API_URL);
  }

  
}