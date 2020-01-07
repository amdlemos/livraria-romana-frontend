// angular
import { NgForm } from '@angular/forms';
import { Component, OnInit, ElementRef } from '@angular/core';
// ngx-toastr
import { ToastrService } from 'ngx-toastr';
// app
import { BookService } from 'src/app/_services/book.service';


@Component({
  selector: 'app-livro',
  templateUrl: './book-form.component.html',  
  styles: []  
})
export class BookFormComponent implements OnInit { 

  constructor(private service:BookService,private toastr: ToastrService, private el: ElementRef) { }

  ngOnInit(form?:NgForm) {    
    this.service.resetForm(form);       
  }
  
  resetForm(form?:NgForm)
  {    
    this.service.resetForm(form)
  }

  onSubmit(form: NgForm){            
    if(form.value.id == 0 || form.value.id == null)  {
      form.value.id = 0;
      this.add(form);
    }
    else
      this.edit(form)
  }

  add(form: NgForm): void {         
    this.service.add(form.value).subscribe(
      res =>{
        this.service.resetForm(form);
        this.toastr.success("Salvo com sucesso!", "Registro de Livros");
        this.service.refreshList();
      }        
    );
  }

  edit(form: NgForm) {    
    this.service.edit(form.value).subscribe(
      res => {        
        this.toastr.info('Alteração realizada com sucesso!', 'Registro de Livros');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
}
 