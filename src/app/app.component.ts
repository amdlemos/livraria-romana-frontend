// angular
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';

// app
import { AuthService } from "./_services/auth.service"


const PrimaryWhite = '#ffffff';
const SecondaryGrey = '#ccc';
const PrimaryRed = '#dd0031';
const SecondaryBlue = '#006ddd';


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
