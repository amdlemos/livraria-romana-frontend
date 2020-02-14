import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log("init usercomponent")
    this.authService.ifLoggedShowNavBar();
  }

}
