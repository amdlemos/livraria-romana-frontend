import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../_models/user.model';
import { catchError } from 'rxjs/operators';
// angular
import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
// ngx-toastr
import { ToastrService } from 'ngx-toastr';
// app
import { UserService } from 'src/app/_services/user.service';
import { empty, Subscription, Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './user-form.component.html',
  styleUrls: []
})

export class UserFormComponent implements OnInit, OnDestroy {
  
  form: FormGroup;
  private userId: number;
  private title: string;
  private isNew: boolean = true;
  private user: User;
  private subscription: Subscription;
  error$ = new Subject<boolean>();
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService, 
    private toastr: ToastrService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(form?:NgForm) {    
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        // Verifica se é inclusão ou edição  
        this.userId = params['id'];
        if (this.userId != null) {
          this.isNew = false;
          this.userService.get(this.userId).toPromise()
            .then(data => this.user = data);
          this.title = 'Editar';
        } else {
          this.isNew = true;
          this.title = 'Novo';
          this.user = new User();
        }

        this.initForm();
      })
  }

  initForm() {
    console.log("init")
    this.form = this.formBuilder.group({
      id: [0],
      username: ["", Validators.required],
      password: ["", Validators.required],
      role: [""],
      email: [""], 
      token: [""]      
    })
  }

  onSave() {
    const userForm = this.form;
    let result;

    if (this.isNew)
      result = this.userService.add(userForm.value);
    else
      result = this.userService.edit(userForm.value);


    result.pipe().subscribe(
      data => {
        this.toastr.info('Alteração realizada com sucesso!', 'Registro de Livros');
        this.form.markAsUntouched();
        this.markFormAsPristine();
        this.userService.refreshList();
      },
      err => {
        alert("Ocorreu um erro.");
      });
  }

  markFormAsPristine() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsPristine();
    })
  }

  // aplica css erro para inputs
  applyCssError(field: string) {
    if (field != null) {
      return {
        'has-error': this.checkValidTouched(field),
        'has-feedback': this.checkValidTouched(field)
      }
    }
  }

  // verifica se determinado campo é invalido e se foi tocado
  checkValidTouched(field: string) {
    var input = this.form.get(field);
    return !input.valid && input.touched;
  }

 

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCancel() {
    this.navigateBack();
  }

  private navigateBack() {
    this.router.navigate(['/user']);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      return confirm('Existem dados que não foram salvos e serão perdidos, você deseja continuar?');
    }
    return true;
  }

  
}
