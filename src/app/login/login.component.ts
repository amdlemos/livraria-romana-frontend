// angular
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
// app
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  error: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(form?:NgForm) {    
    //this.resetForm();
  }

  resetForm(form?:NgForm){    
    if(form!=null)
      form.form.reset();    
 
    this.authService.formData = {            
      username:'',
      password:''      
    }  
    this.authService.nomeFocus();
  }

  login(username: string, password: string){    
    this.authService.login(username, password).subscribe(
      success => this.router.navigate(['list']),
      error => this.error = error
    );
  }
  

}
