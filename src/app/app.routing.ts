// angular
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
// app components
import { BookComponent } from './book/book.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
// app services
import { AuthGuard } from './_services/auth-guard.service'

const APP_ROUTES: Routes = [    
    { path: '', component: HomeComponent },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'book', component: BookComponent, canActivate: [AuthGuard] },    
    { path: 'login', component: LoginComponent },

    // Qualquer outra chamada é redirecionada pra Home
    { path: '**', redirectTo: ''}    
];

@NgModule({
	imports: [RouterModule.forRoot(APP_ROUTES)],
	exports: [RouterModule]
})

export class AppRouting{}

//export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);

