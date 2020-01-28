// import { Observable } from 'rxjs';
// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// rxjs./message.service
import { take, catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';
import { Observable, pipe } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
}

@Injectable()
export class CrudService<T> {  

  constructor(
    protected http:HttpClient,    
    private API_URL: string) {}

  add(record: T) {    
    console.log(record);        
    return this.http.post<T>(this.API_URL, record, httpOptions).pipe(take(1));      
  }

  edit(record: T){    
    return this.http.put(`${this.API_URL}/${record['id']}`, record).pipe(take(1));
  }

  delete(id){   
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  get(id){        
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));       
  }  

  getAll() :Observable<T[]> {    
    return this.http.get<T[]>(this.API_URL).pipe(take(1));
  }

  
}