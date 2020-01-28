// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

// ngx-toastr
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerModule } from 'ngx-spinner';

// app components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRouting } from './app.routing';
// book
import { BookComponent } from './book/book.component';
import { BookFormComponent } from './book/book-form/book-form.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
// user
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
// services
import { UserService } from 'src/app/_services/user.service';
import { LoginService } from './_services/login.service';
import { BookService } from './_services/book.service';
import { AuthService } from './_services/auth.service';
import { AuthInterceptor } from './_services/auth-interceptor.service';
import { AuthGuard } from './_services/auth-guard.service';
import { CrudService} from './_services/crud.service';
import { LoginFormComponent } from './login-form/login-form.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { FieldErrorControlComponent } from './field-error-control/field-error-control.component';
import { BookListItemComponent } from './book/book-list-item/book-list-item.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,    
    HttpClientModule,     
    NgxSpinnerModule,
    ToastrModule.forRoot({      
      positionClass: 'toast-center-center',
      timeOut: 3000, 
      closeButton: true, 
      progressBar: true     
      }),
      ModalModule.forRoot(),
    ReactiveFormsModule,    
    AppRouting, ModalModule.forRoot()
  ],
  exports: [RouterModule],
  declarations: [
    AppComponent,   
    HomeComponent,    
    // book
    BookComponent,
    BookFormComponent,
    BookListComponent,
    // user
    UserComponent,
    UserFormComponent,
    UserListComponent,
    LoginFormComponent,
    FormDebugComponent,
    FieldErrorControlComponent,
    BookDetailComponent,
    BookListItemComponent,
  ],   
  bootstrap: [AppComponent],
  providers: [    
    CrudService,
    BookService,
    UserService,
    LoginService,
    AuthService,
    AuthInterceptor,
    AuthGuard, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AppModule { }
