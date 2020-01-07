import { CrudService } from './crud.service';

// angular
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// rxjs./message.service
import { take } from 'rxjs/operators';
// app
import { Book } from '../_models/book.model';
import { HandleError } from './http-error-handler.service';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  })
}

@Injectable()
export class BookService extends CrudService<Book> {  

  private readonly API = `${environment.API}livro`;  
  list: Book[];
  formData: Book;
  
  constructor(protected http:HttpClient) {
    super(http, `${environment.API}book`);
  }

  refreshList(){
    this.getAll().toPromise().then(res => this.list = res as Book[]);
  }

  resetForm(form?:NgForm){       
    if(form!=null)
      form.form.reset();    
    
    this.formData = {
      id:0,
      author:'',
      title:'',
      originalTitle:'',
      publicationYear:null,
      publishingCompany:'',
      isbn:''
    }  
    
    this.autorFocus();    
  }  

  autorFocus(){
    var input = document.getElementsByName("author")[0];
    input.focus();
  }
}