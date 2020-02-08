import { HttpErrorResponse } from '@angular/common/http';
import { Login } from './../_models/login.model';
// angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// ngx
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
// app
import { AuthService } from '../_services/auth.service';

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
    private spinner: NgxSpinnerService) { }

  // Inicio
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
    console.log(this.form.value);

    // valida formulário
    if (this.form.valid) {
    
      // post
      this.authService.login(this.form.value).subscribe(success => {
        this.router.navigate(['/book']);
        console.log("sucess login");   
        this.spinner.hide();     
    
      },
        (errorResponse: HttpErrorResponse) => {    
          console.log("error login: backend");  
          console.log(errorResponse);

          // verifica se há erros do servidor que possam ser exibidos         
          if (errorResponse.error.hasNotifications) {     
            this.spinner.hide();            
            // exibe erro
            this.toastr.error(errorResponse.error.notifications[0].message);
          }

        });
    }else{
      
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

  // verifica se é um email válido
  // checkValidEmail() {   
  //   let filedEmail = this.form.get('email');
  //   console.log(filedEmail.errors);
  //   if (filedEmail.errors) {
  //     return filedEmail.errors['email'] && filedEmail.touched;
  //   }
  // }

  // aplica css erro para inputs
  applyCssError(field: string) {
    if (field != null) {      
      return {
        'has-error': this.checkValidTouched(field),
        'has-feedback': this.checkValidTouched(field)
      }
    }
  }
}
