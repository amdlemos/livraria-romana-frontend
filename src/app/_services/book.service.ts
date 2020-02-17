// angular
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { Observable, empty } from 'rxjs';

// app
import { CrudService } from './crud.service';
import { Book } from '../_models/book.model';
import { environment } from 'src/environments/environment';
import { HttpHandlerError } from './http-handler-error.service';
import { take, catchError } from 'rxjs/operators';


@Injectable()
export class BookService extends CrudService<Book> {

  booksChanged = new EventEmitter<Observable<Book[]>>();

  constructor(
    protected http: HttpClient,
    protected handlerError: HttpHandlerError) {
    super(http, `${environment.API}book`, handlerError);
  }

  refreshList() {
    this.booksChanged.emit(this.getAll());
  }

  editStock(book){
    return this.http.put(`${environment.API}bookstock/`, book).pipe(
      take(1),
      catchError(error => {         
        this.handlerError.handlerError(error);
        //this.error$.next(true);
        return empty();
      })
    );
  }
}