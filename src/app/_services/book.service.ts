
import { CrudService } from './crud.service';

// angular
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

// rxjs./message.service
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

// app
import { Book } from '../_models/book.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class BookService extends CrudService<Book> {  

  booksChanged = new EventEmitter<Observable<Book[]>>();
  private url: string = `${environment.API}book`;
  _header: Headers;

  books: Book[];  
  
  constructor(protected http:HttpClient) {  
    super(http, `${environment.API}book`);
  }

 
  //  return this.getAll().toPromise().then(res => res as Book[]);
 

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // return an observable with a user-facing error message
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };

  
  autorFocus(){
    var input = document.getElementsByName("author")[0];
    input.focus();
  }

  private getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  private handleError(error: any) {
    let erro = error.message || 'Server error';
    console.error('Ocorreu um erro', error);
    return Observable.throw(erro);
  }

  private getUrl(id){
    return `${this.url}/${id}`;
  }
}