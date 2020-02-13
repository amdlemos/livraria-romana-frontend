// angular
import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// app
import { CrudService } from './crud.service';
import { User } from '../_models/user.model';
import { environment } from 'src/environments/environment';
import { HttpHandlerError } from './http-handler-error.service';


@Injectable()
export class UserService extends CrudService<User> {


  list: User[];
  formData: User;

  constructor(
    protected http: HttpClient,
    protected handlerError: HttpHandlerError) {
    super(http, `${environment.API}user`, handlerError);
  }

  refreshList() {
    this.getAll().toPromise().then(res => this.list = res as User[]);
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.form.reset();

    this.formData = {
      id: 0,
      username: '',
      password: '',
      email: '',
      token: '',
    }
    this.nomeFocus();
  }

  nomeFocus() {
    var input = document.getElementsByName("username")[0];
    input.focus();
  }
}