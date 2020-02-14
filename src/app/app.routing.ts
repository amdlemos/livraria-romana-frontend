import { BookComponent } from './book/book.component';
import { NotFoundComponent } from './shared/not-found.component';
import { AppComponent } from './app.component';
// angular
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// app components
import { BookFormComponent } from './book/book-form/book-form.component';
import { BookDetailComponent } from './book/book-detail/book-detail.component';
import { BookListComponent } from './book/book-list/book-list.component';
import { UserComponent } from './user/user.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
// app services
import { AuthGuard } from './_services/auth-guard.service'
import { BookFormGuard } from './book/book-form/book-form-guard';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserFormGuard } from './user/user-form/user-form.guard';


const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginFormComponent },
    // user
   
    {
        path: 'user', component: UserComponent, canActivate: [AuthGuard], children: [
            { path: 'new', component: UserFormComponent, canActivate: [AuthGuard], canDeactivate: [UserFormGuard] },
            { path: ':id/edit', component: UserFormComponent, canDeactivate: [UserFormGuard] },
            { path: ':id', component: UserDetailComponent }
           
        ]
    },
    // book
    {
        path: 'book', component: BookComponent, canActivate: [AuthGuard], children: [
            { path: 'new', component: BookFormComponent, canActivate: [AuthGuard], canDeactivate: [BookFormGuard] },
            { path: ':id/edit', component: BookFormComponent, canDeactivate: [BookFormGuard] },
            { path: ':id', component: BookDetailComponent }
           
        ]
    },
    // errors 
    { path: 'not-found', component: NotFoundComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(APP_ROUTES)],
    exports: [RouterModule]
})

export class AppRouting { }



