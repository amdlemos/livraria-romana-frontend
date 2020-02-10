// angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
// ngx
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
// app
import { AuthService } from '../_services/auth.service';
import { HttpHandlerError } from './../_services/http-handler-error.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: []
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private handlerError: HttpHandlerError) { }
  
  ngOnInit() {
    // Cria o formulário com seus respectivos campos
      this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]      
    })
  }

  // Submit
  onSubmit() {    
    this.spinner.show();
    console.log("submit login");    
    
    // valida formulário
    if (this.form.valid) {          
      // post
      this.authService.login(this.form.value).subscribe(success => {               
        // sucess 
        console.log("sucess login");   
        this.router.navigate(['/book']);
        this.spinner.hide();         
      },
      (errorResponse: HttpErrorResponse) => {    
        // backend error
        console.log("error login: backend");            
        this.handlerError.handlerError(errorResponse);  
        this.spinner.hide();           
      });
    }else{      
      // frontend error
      console.log("error login: frontend");      
      Object.keys(this.form.controls).forEach(field => {        
        const control = this.form.get(field);
        control.markAsDirty();
        control.markAsTouched();        
      })
      this.spinner.hide();
    }
  }

  // verifica se determinado campo é invalido e se foi tocado
  checkValidTouched(field: string) {
    var input = this.form.get(field);    
    return !input.valid && input.touched;
  }

  // aplica css de erro 
  applyCssError(field: string) {
    if (field != null) {      
      return {
        'has-error': this.checkValidTouched(field),
        'has-feedback': this.checkValidTouched(field)
      }
    }
  }
}
