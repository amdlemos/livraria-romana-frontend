import { catchError } from 'rxjs/operators';
import { HttpHandlerError } from './../../_services/http-handler-error.service';
import { HttpErrorResponse } from '@angular/common/http';
// angular
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// rxjs
import { Subscription, Observable, pipe, Subject, empty } from 'rxjs';
// ngx
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
// app
import { BookService } from 'src/app/_services/book.service';
import { Book } from './../../_models/book.model';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styles: []
})

export class BookFormComponent implements OnInit {

  form: FormGroup;
  private bookId: number;
  private title: string;
  private isNew: boolean = true;
  private book: Book;
  private subscription: Subscription;
  error$ = new Subject<boolean>();


  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,        
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {        
    // Trata os parametros da rota
    this.subscription = this.route.params.subscribe(
      (params: any) => {        
        // Verifica se é inclusão ou edição  
        this.bookId = params['id'];              
        if (this.bookId != null) {         
          this.isNew = false;
          this.bookService.get(this.bookId).toPromise()
            .then(data => this.book = data);
          this.title = 'Editar';
        }else {
          this.isNew = true;
          this.title = 'Novo';
          this.book = new Book();
        }

        this.initForm();       
    })   
  }

  initForm(){    
    this.form = this.formBuilder.group({
      id: [0],
      author: ["", Validators.required],
      title: ["", Validators.required],
      publishingCompany: [""],
      isbn: [""],
      publicationYear: [""]
    })    
  }

  onSave() {
    const bookForm = this.form;
    
    if (this.isNew)
      this.add(bookForm);
    else 
      this.edit(bookForm);
    
   
    // result.subscribe(data => this.navigateBack(),
    // err => {
    //   alert("Ocorreu um erro.");
    // });
  }

  // add book
  add(form: FormGroup): void {    
    form.value.id = 0;
    var result = this.bookService.add(form.value).subscribe();//.pipe(
      
    // )
      // res => {
      //   this.spinner.hide();
      //   this.toastr.success("Salvo com sucesso!", "Registro de Livros");      
      //   this.form.reset();
      // },
      // (errorResponse: HttpErrorResponse) => {
      //   this.handlerError.handlerError(errorResponse);
      // });
  }

  // edit book
  edit(form: FormGroup): void {
    console.log("edit");
    console.log(form.value);
    this.bookService.edit(form.value).subscribe(
      res => {
    
        this.toastr.info('Alteração realizada com sucesso!', 'Registro de Livros');
        this.form.reset();
      },
      err => {
        console.log(err);
      }
    )
  }

  // verifica se determinado campo é invalido e se foi tocado
  checkValidTouched(field: string) {
    var input = this.form.get(field);
    return !input.valid && input.touched;
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

  formPopulation(book: Book) {
    this.form.patchValue({
      id: this.book.id,
      author: this.book.author,
      title: this.book.title,
      publishingCompany: this.book.publishingCompany,
      isbn: this.book.isbn,
      publicationYear: this.book.publicationYear
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onCancel() {
    this.navigateBack();
  }

  private navigateBack() {
    this.router.navigate(['/book']);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      return confirm('Existem dados que não foram salvos e serão perdidos, você deseja continuar?');
    }
    return true;
  }
}
