import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livros',
  templateUrl: './book.component.html',
  styles: []
})
export class BookComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.ifLoggedShowNavBar();
  }

}
