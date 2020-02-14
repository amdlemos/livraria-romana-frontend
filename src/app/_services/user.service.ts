import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
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

  usersChanged = new EventEmitter<Observable<User[]>>();

  constructor(
    protected http: HttpClient,
    protected handlerError: HttpHandlerError) {
    super(http, `${environment.API}user`, handlerError);
  }

  refreshList() {
    this.usersChanged.emit(this.getAll());
  }


}