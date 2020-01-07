// angular
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// app
import { AuthService } from "./_services/auth.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  
  constructor(private authService:AuthService) { }

  getAnimationData(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  logout(){
    console.log("chegou no component");
  	this.authService.logout();
  }
}
