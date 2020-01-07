// angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
// ngx-toastr
import { ToastrModule } from 'ngx-toastr';
// app components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRouting } from './app.routing';
// book
import { BookComponent } from './book/book.component';
import { BookFormComponent } from './book/book-form/book-form.component';
import { BookListComponent } from './book/book-list/book-list.component';
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


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,    
    HttpClientModule,        
    ToastrModule.forRoot(),
    //routing,
    AppRouting
  ],
  exports: [RouterModule],
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,    
    // book
    BookComponent,
    BookFormComponent,
    BookListComponent,
    // user
    UserComponent,
    UserFormComponent,
    UserListComponent,
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
