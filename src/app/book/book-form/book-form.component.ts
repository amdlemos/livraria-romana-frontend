// angular
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// rxjs
import { Subscription } from 'rxjs';
// ngx
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
// app
import { BookService } from 'src/app/_services/book.service';
import { Book } from './../../_models/book.model';


@Component({
  selector: 'app-livro',
  templateUrl: './book-form.component.html',
  styles: []
})

export class BookFormComponent implements OnInit {

  form: FormGroup;
  private bookIndex: number;
  private title: string;
  private isNew: boolean = true;
  private book: Book;
  private subscription: Subscription;


  constructor(
    private formBuilder: FormBuilder,
    private service: BookService,    
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {    
    console.log(this.route);
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.bookIndex = params['id'];
        
        if (this.bookIndex != null) {         
          this.isNew = false;
          this.service.get(this.bookIndex)
            .toPromise()
            .then(data => this.book = data);

          this.title = 'Editar livro';
        }else {
          this.isNew = true;
          this.book = new Book();
        }

        this.initForm();
        //this.formPopulation(this.book);
    })   
  }

  initForm(){    
    this.form = this.formBuilder.group({
      id: [0],
      author: [null, Validators.required],
      title: [null, Validators.required],
      publishingCompany: [null],
      isbn: [null],
      publicationYear: [null]
    })    
  }

  onCancel() {
    this.navigateBack();
  }

  private navigateBack() {
    this.router.navigate(['/book']);
  }

  nSave() {
    const bookValue = this.form.value;
    let result;

    if (this.isNew){
      result = this.service.edit(bookValue);
    } else {
      result = this.service.add(bookValue);
    }

    this.form.reset();

    result.subscribe(data => this.navigateBack(),
    err => {
      alert("An error occurred.");
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // canDeactivate(): Observable<boolean> | boolean {
  //   if (this.form.dirty) {
  //     return confirm('Do you want to leave this page?');
  //   }
  //   return true;
  // }



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
  // onSubmit() {
  //   this.spinner.show();
  //   console.log("submit")

  //   // verifica se form é valido
  //   if (this.form.valid) {

  //     // verifica se add ou edit
  //     if (this.form.value.id == 0 || this.form.value.id == null) {
  //       this.form.value.id = 0;
  //       this.add(this.form);
  //     }
  //     else {
  //       this.edit(this.form);
  //     }

  //   }
  // }


  // add book
  add(form: FormGroup): void {
    this.service.add(form.value).subscribe(
      res => {
        this.spinner.hide();
        this.toastr.success("Salvo com sucesso!", "Registro de Livros");
        this.form.reset();
        this.form.reset();
      },
      (errorResponse: any) => {

        // verifica se há erros do servidor que possam ser exibidos         
        if (errorResponse.error.hasNotifications) {

          this.spinner.hide();
          console.log("erros do servidor");
          console.log(errorResponse.error.notifications[0].message)
          // exibe erro 
          errorResponse.error.notifications.forEach(element => {
            this.toastr.error(element.message)
          });
          //this.toastr.error(errorResponse.error.notifications[0].message);
        }

      });
  }

  // edit book
  edit(form: FormGroup) {
    this.service.edit(form.value).subscribe(
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
}
