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
        } else {
          this.isNew = true;
          this.title = 'Novo';
          this.book = new Book();
        }

        this.initForm();
      })
  }

  initForm() {
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
    let result;

    if (this.isNew)
      result = this.bookService.add(bookForm.value);
    else
      result = this.bookService.edit(bookForm.value);


    result.pipe().subscribe(
      data => {
        this.toastr.info('Alteração realizada com sucesso!', 'Registro de Livros');
        this.form.markAsUntouched();
        this.markFormAsPristine();
        this.bookService.refreshList();
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
    this.router.navigate(['/book/' + this.bookId]);
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      return confirm('Existem dados que não foram salvos e serão perdidos, você deseja continuar?');
    }
    return true;
  }
}
