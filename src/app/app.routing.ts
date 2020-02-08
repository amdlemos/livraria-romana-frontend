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


const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginFormComponent },
    // user
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    // book
    {
        path: 'book', component: BookComponent, canActivate: [AuthGuard], children: [
            { path: ':id', component: BookDetailComponent },
            { path: 'new', component: BookFormComponent, canActivate: [AuthGuard], canDeactivate: [BookFormGuard] },
            { path: ':id/edit', component: BookFormComponent, canDeactivate: [BookFormGuard] }
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



