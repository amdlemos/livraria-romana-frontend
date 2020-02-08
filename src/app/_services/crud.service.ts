// import { Observable } from 'rxjs';
// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
// rxjs./message.service
import { take, catchError, delay } from 'rxjs/operators';
import { Observable, pipe, empty } from 'rxjs';
import { HttpHandlerError } from './http-handler-error.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
}

@Injectable()
export class CrudService<T> {  

  constructor(
    protected http:HttpClient,    
    private API_URL: string,
    protected handlerError: HttpHandlerError) {}

  add(record: T) {        
    // return this.http.post<T>(this.API_URL, record, httpOptions).pipe(take(1));          
    console.log(record)
    return this.http.post<T>(this.API_URL, record, httpOptions).pipe(
      take(1),
      catchError(error => {         
        this.handlerError.handlerError(error);
        //this.error$.next(true);
        return empty();
      })
    )
  }

  edit(record: T){        
    return this.http.put(`${this.API_URL}/${record['id']}`, record).pipe(
      take(1),
      catchError(error => {         
        this.handlerError.handlerError(error);
        //this.error$.next(true);
        return empty();
      })
    );
  }

  delete(id){   
    return this.http.delete(`${this.API_URL}/${id}`).pipe(
      take(1),
      catchError(error => {         
        this.handlerError.handlerError(error);
        //this.error$.next(true);
        return empty();
      })
    );;
  }

  get(id){        
    return this.http.get<T>(`${this.API_URL}/${id}`).pipe(
      take(1),
      catchError(error => {         
        this.handlerError.handlerError(error);
        //this.error$.next(true);
        return empty();
      })
    );       
  }  

  getAll() :Observable<T[]> {    
    return this.http.get<T[]>(this.API_URL).pipe(
      take(1),
      catchError(error => {         
        this.handlerError.handlerError(error);
        //this.error$.next(true);
        return empty();
      })
    );
  }

  
}