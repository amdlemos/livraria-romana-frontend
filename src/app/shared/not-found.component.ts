import { AuthService } from 'src/app/_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-not-found',
    template: '<h2> Página não encontrada! <h2>'
})
export class NotFoundComponent implements OnInit{

    constructor(private authService: AuthService){}

    ngOnInit() {
        this.authService.ifLoggedShowNavBar();
    }
}