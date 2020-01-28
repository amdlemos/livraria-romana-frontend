import { BookComponent } from './book/book.component';


import { Component } from '@angular/core';
// angular
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
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


const APP_ROUTES: Routes = [    
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginFormComponent },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },            
    { path: 'book', component: BookListComponent, children: [      
        { path: 'new', component: BookFormComponent },
        { path: ':id', component: BookDetailComponent },
        { path: ':id/edit', component: BookFormComponent },   

    // Qualquer outra chamada é redirecionada pra Home
    { path: '**', redirectTo: ''}    
]}
];

@NgModule({
	imports: [RouterModule.forRoot(APP_ROUTES)],
	exports: [RouterModule]
})

export class AppRouting{}



