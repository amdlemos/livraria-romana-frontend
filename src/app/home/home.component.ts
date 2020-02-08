import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
  
})
export class HomeComponent implements OnInit {
 
  constructor(private authService: AuthService) { }
 
  ngOnInit() {
    this.authService.ifLoggedShowNavBar();
  }

}
