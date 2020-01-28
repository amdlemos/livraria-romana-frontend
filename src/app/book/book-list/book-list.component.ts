import { Book } from './../../_models/book.model';
// angular
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
// ngx-toastr
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// app
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-livro-list',
  templateUrl: './book-list.component.html',
  styles: []
})

export class BookListComponent implements OnInit {
  
  modalRef: BsModalRef;
  form: FormGroup;
  books: Book[];  
  constructor(private service: BookService, private toastr: ToastrService, private modalService: BsModalService) { }

  ngOnInit() {
    this.service.getAll().toPromise().then(data => this.books = data as Book[], err => {
      alert("algo aconteceu");
    });

    this.service.booksChanged.subscribe(
      (observable: any) => observable.subscribe(
        data => this.books = data
      )
    );    
  } 
}