import { BookUpdateAmount } from './../../_models/book-update-amount.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/_models/book.model';
import { BookService } from 'src/app/_services/book.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-stock-form',
  templateUrl: './book-stock-form.component.html',
  styleUrls: []
})
export class BookStockFormComponent implements OnInit {

  form: FormGroup;
  private bookId: number;
  private title: string;
  private book: Book;
  private bookUpdateAmount: BookUpdateAmount;
  private subscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        // Obtem o id do livro
        this.bookId = params['id'];
      }
    )

    this.bookService.get(this.bookId).subscribe(data => {
      this.book = data;
      this.bookUpdateAmount = new BookUpdateAmount();
      this.bookUpdateAmount.id = this.bookId;
      this.bookUpdateAmount.amount = this.book.amount;
    });
    this.title = "Controle de Estoque";

    this.initForm();

  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [0],
      amount: [0],
      addToAmount: [0],
      removeToAmount: [0]
    })
  }

  onSave() {
    console.log("onSave bookstock");
    console.log(this.form.value);
    this.bookService.editStock(this.form.value).pipe().subscribe(
      data => {
        this.book = data as Book;
        this.bookUpdateAmount.amount = this.book.amount;
        this.bookUpdateAmount.addToAmount = 0;
        this.bookUpdateAmount.removeToAmount = 0;
        this.bookService.refreshList();
        this.toastr.info('Alteração realizada com sucesso!', 'Registro de Livros');
        this.form.markAsUntouched();
        this.markFormAsPristine();
      },
      err => {
        alert("Ocorreu um erro.");
      });

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

  markFormAsPristine() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control.markAsPristine();
    })
  }


}
