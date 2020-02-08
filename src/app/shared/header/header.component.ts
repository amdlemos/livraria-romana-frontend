import { AuthService } from 'src/app/_services/auth.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent {

  private showNavBar: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(){
    this.authService.showNavBarEmitter.subscribe(
      (mode: boolean) => {
        if (mode !== null) {
          this.showNavBar = mode;
        }
      }
    );
  }

  isAuth() {
    return this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
  }

}


