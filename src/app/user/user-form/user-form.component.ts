import { catchError } from 'rxjs/operators';
// angular
import { Component, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
// ngx-toastr
import { ToastrService } from 'ngx-toastr';
// app
import { UserService } from 'src/app/_services/user.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './user-form.component.html',
  styleUrls: []
})

export class UserFormComponent implements OnInit {
  
  constructor(private service: UserService, private toastr: ToastrService, private el: ElementRef) { }

  ngOnInit(form?:NgForm) {    
    this.service.resetForm();
  }

  resetForm(form: NgForm)
  {    
    this.service.resetForm(form)
  }

  onSubmit(form: NgForm){      
    console.log("Submit usuário")
    if(form.value.id == 0 || form.value.id == null)  {      
      form.value.id = 0;
      this.add(form);
    }      
    else
      this.edit(form)
  }

  add(form: NgForm): void {       
    console.log(form);   
    this.service.add(form.value)
    .pipe(     
      catchError(error => empty())      
    )
    .subscribe(
      res =>{        
        this.service.resetForm(form);
        this.toastr.success("Salvo com sucesso!", "Registro de Usuário");
        this.service.refreshList();
      }, error => {
        console.log(error.status);
        this.toastr.error("erro");
      }        
    );
  }

  edit(form: NgForm) {    
    this.service.edit(form.value).subscribe(
      res => {        
        this.toastr.info('Alteração realizada com sucesso!', 'Registro de Usuário');
        this.service.refreshList();
      },
      err => {
        console.log(err);
      }
    )
  }
}
