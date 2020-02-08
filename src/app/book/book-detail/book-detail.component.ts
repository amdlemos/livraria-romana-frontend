import { HttpEvent } from '@angular/common/http';
import { Book } from './../../_models/book.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: []
})

export class BookDetailComponent implements OnInit, OnDestroy {

  selectedBook: Book;
  private bookIndex: number;
  private subscription: Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService) { }


  ngOnInit() {    
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.bookIndex = params['id'];        
        
        this.bookService.get(this.bookIndex)
          .toPromise()
          .then(data => this.selectedBook = data);
        console.log(this.selectedBook);
      }
    )
  }

  onEdit() {
    this.router.navigate(['/book', this.bookIndex, 'edit']);
  }

  onDelete(){
    // refatorar
    if (confirm("Você tem certeza que deseja excluir o livro: " + this.selectedBook.title + "?")) {
      this.bookService.delete(this.bookIndex)
        .toPromise().then(
          data => this.router.navigate(['book']),
          err => {
            alert("Livro não removido.");
          });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
