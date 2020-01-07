// angular
import { Component, OnInit } from '@angular/core';
// ngx-toastr
import { ToastrService } from 'ngx-toastr';
// app
import { User } from '../../_models/user.model';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-usuario-list',
  templateUrl: './user-list.component.html',
  styleUrls: []
})
export class UserListComponent implements OnInit {

  constructor(private service: UserService, private toastr:ToastrService ) { }

  ngOnInit() {    
    this.service.refreshList();
  }

  populateForm(usuario: User){     
    this.service.formData = Object.assign({}, usuario);
    this.service.nomeFocus();    
  }

  onDelete(UsuarioId) {    
    if(confirm('Tem certeza que deseja apagar o registro?')){
      this.service.delete(UsuarioId)
      .subscribe(res => {
        this.service.refreshList();
        this.toastr.warning("Excluido com sucesso", "Registro de Usuários");
        this.service
      },
        err => {
          console.log(err);
        })
    }
  }
}
