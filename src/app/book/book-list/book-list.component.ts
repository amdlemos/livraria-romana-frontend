import { HttpHandlerError } from './../../_services/http-handler-error.service';
import { catchError } from 'rxjs/operators';
import { Book } from './../../_models/book.model';
// angular
import { Component, OnInit, TemplateRef } from '@angular/core';


// app
import { BookService } from 'src/app/_services/book.service';
import { Observable, empty, Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styles: []
})

export class BookListComponent implements OnInit {  
 
  books$: Book[];  
  error$ = new Subject<boolean>();

  constructor(
    private bookService: BookService,
    private handlerError: HttpHandlerError) { }

  ngOnInit() {
    this.bookService.getAll().subscribe(data => this.books$ = data);
      // .pipe(
      //   catchError(error => {         
      //     this.handlerError.handlerError(error);
      //     this.error$.next(true);
      //     return empty();
      //   })
      // ) 
   

    this.bookService.booksChanged.subscribe(
      (observable: any) => observable.subscribe(
        data => this.books$ = data
      )
    );    
  } 
}