import { Subject } from 'rxjs';
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

  users: User[];  
  
  constructor(
    private userService: UserService ) { }

  ngOnInit() {    
    this.userService.getAll().subscribe(data => this.users = data);

    this.userService.usersChanged.subscribe(
      (observable: any) => observable.subscribe(
        data => this.users = data
      )
    )
  }  
}
