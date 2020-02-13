// angular
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { Observable } from 'rxjs';

// app
import { CrudService } from './crud.service';
import { Book } from '../_models/book.model';
import { environment } from 'src/environments/environment';
import { HttpHandlerError } from './http-handler-error.service';


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
}