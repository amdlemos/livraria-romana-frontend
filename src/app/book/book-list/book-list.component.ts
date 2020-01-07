// angular
import { Component, OnInit } from '@angular/core';
// ngx-toastr
import { ToastrService } from 'ngx-toastr';
// rxjs
import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
// app
import { BookService } from 'src/app/_services/book.service';
import { Book } from '../../_models/book.model';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-livro-list',
  templateUrl: './book-list.component.html',
  styles: []
})
export class BookListComponent implements OnInit {
  form: FormGroup;
  constructor(private service: BookService, private toastr: ToastrService) { }  

  ngOnInit() {
    this.onRefresh();   
  }

  onRefresh() {    
    this.service.getAll().pipe().toPromise().then(res => this.service.list = res as Book[]);
  };

  populateForm(book: Book){       
    this.service.formData = Object.assign({}, book);
    this.service.autorFocus();    
  };

  onDelete(LivroId) {    
    if(confirm('Tem certeza que deseja apagar o registro?')){
      this.service.delete(LivroId)
      .subscribe(res => {
        this.service.resetForm();
        this.service.refreshList();
        this.toastr.warning("Excluido com sucesso", "Registro de Livros");
      },
        err => {
          console.log(err);
        })
    }
  };
}